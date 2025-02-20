// Copyright 2020-2021 IOTA Stiftung
// SPDX-License-Identifier: Apache-2.0

use core::convert::TryFrom;
use core::fmt::Debug;
use core::fmt::Display;
use core::fmt::Formatter;
use core::fmt::Result as FmtResult;
use core::str::FromStr;
use std::hash::Hash;

use did_url::DID as BaseDIDUrl;

use identity_core::diff::Diff;
use identity_core::diff::DiffString;

use crate::did::DIDError;
use crate::did::DIDUrl;

pub trait DID: Clone + PartialEq + Eq + PartialOrd + Ord + Hash + FromStr + TryFrom<BaseDIDUrl> {
  const SCHEME: &'static str = BaseDIDUrl::SCHEME;

  /// Returns the [`DID`] scheme. See [`DID::SCHEME`].
  ///
  /// E.g.
  /// - `"did:example:12345678" -> "did"`
  /// - `"did:iota:main:12345678" -> "did"`
  fn scheme(&self) -> &'static str;

  /// Returns the [`DID`] authority: the method name and method-id.
  ///
  /// E.g.
  /// - `"did:example:12345678" -> "example:12345678"`
  /// - `"did:iota:main:12345678" -> "iota:main:12345678"`
  fn authority(&self) -> &str;

  /// Returns the [`DID`] method name.
  ///
  /// E.g.
  /// - `"did:example:12345678" -> "example"`
  /// - `"did:iota:main:12345678" -> "iota"`
  fn method(&self) -> &str;

  /// Returns the [`DID`] method-specific ID.
  ///
  /// E.g.
  /// - `"did:example:12345678" -> "12345678"`
  /// - `"did:iota:main:12345678" -> "main:12345678"`
  fn method_id(&self) -> &str;

  /// Returns the serialized [`DID`].
  ///
  /// This is fast since the serialized value is stored in the [`DID`].
  fn as_str(&self) -> &str;

  /// Consumes the [`DID`] and returns its serialization.
  fn into_string(self) -> String;

  /// Constructs a [`DIDUrl`] by attempting to append a string representing a path, query, and/or
  /// fragment to this [`DID`].
  fn join(self, value: impl AsRef<str>) -> Result<DIDUrl<Self>, DIDError>
  where
    Self: Sized;

  /// Clones the [`DID`] into a [`DIDUrl`] of the same method.
  fn to_url(&self) -> DIDUrl<Self>;

  /// Converts the [`DID`] into a [`DIDUrl`] of the same method.
  fn into_url(self) -> DIDUrl<Self>;
}

#[derive(Clone, PartialEq, Eq, PartialOrd, Ord, Hash, serde::Deserialize, serde::Serialize)]
#[repr(transparent)]
#[serde(into = "BaseDIDUrl", try_from = "BaseDIDUrl")]
pub struct CoreDID(BaseDIDUrl);

impl CoreDID {
  /// Parses a [`CoreDID`] from the given `input`.
  ///
  /// # Errors
  ///
  /// Returns `Err` if the input is not a valid [`DID`].
  pub fn parse(input: impl AsRef<str>) -> Result<Self, DIDError> {
    let base_did_url: BaseDIDUrl = BaseDIDUrl::parse(input).map_err(DIDError::from)?;
    Self::try_from_base_did(base_did_url)
  }

  /// Try convert a [`BaseDIDUrl`] into a [`CoreDID`].
  fn try_from_base_did(base_did_url: BaseDIDUrl) -> Result<Self, DIDError> {
    Self::check_validity(&base_did_url)?;
    Ok(Self(base_did_url))
  }

  /// Set the method name of the [`DID`].
  pub fn set_method_name(&mut self, value: impl AsRef<str>) -> Result<(), DIDError> {
    Self::valid_method_name(value.as_ref())?;
    self.0.set_method(value);
    Ok(())
  }

  /// Validates whether a string is a valid [`DID`] method name.
  pub fn valid_method_name(value: &str) -> Result<(), DIDError> {
    if !value.chars().all(is_char_method_name) {
      return Err(DIDError::InvalidMethodName);
    }
    Ok(())
  }

  /// Set the method-specific-id of the [`DID`].
  pub fn set_method_id(&mut self, value: impl AsRef<str>) -> Result<(), DIDError> {
    Self::valid_method_id(value.as_ref())?;
    self.0.set_method_id(value);
    Ok(())
  }

  /// Validates whether a string is a valid [`DID`] method-id.
  pub fn valid_method_id(value: &str) -> Result<(), DIDError> {
    if !value.chars().all(is_char_method_id) {
      return Err(DIDError::InvalidMethodId);
    }
    Ok(())
  }

  /// Checks if the given `did` is valid according to the base [`DID`] specification.
  pub fn check_validity(did: &BaseDIDUrl) -> Result<(), DIDError> {
    // Validate basic DID constraints.
    Self::valid_method_name(did.method())?;
    Self::valid_method_id(did.method_id())?;
    if did.scheme() != Self::SCHEME {
      return Err(DIDError::InvalidScheme);
    }

    // Ensure no DID Url segments are present.
    if !did.path().is_empty() || did.fragment().is_some() || did.query().is_some() {
      return Err(DIDError::InvalidMethodId);
    }

    Ok(())
  }
}

impl DID for CoreDID {
  fn scheme(&self) -> &'static str {
    self.0.scheme()
  }

  fn authority(&self) -> &str {
    self.0.authority()
  }

  fn method(&self) -> &str {
    self.0.method()
  }

  fn method_id(&self) -> &str {
    self.0.method_id()
  }

  fn as_str(&self) -> &str {
    self.0.as_str()
  }

  fn into_string(self) -> String {
    self.0.into_string()
  }

  fn join(self, value: impl AsRef<str>) -> Result<DIDUrl<Self>, DIDError> {
    DIDUrl::new(self, None).join(value)
  }

  fn to_url(&self) -> DIDUrl<Self> {
    DIDUrl::new(self.clone(), None)
  }

  fn into_url(self) -> DIDUrl<Self> {
    DIDUrl::new(self, None)
  }
}

impl From<CoreDID> for BaseDIDUrl {
  fn from(did: CoreDID) -> Self {
    did.0
  }
}

impl TryFrom<BaseDIDUrl> for CoreDID {
  type Error = DIDError;

  fn try_from(base_did_url: BaseDIDUrl) -> Result<Self, Self::Error> {
    Self::try_from_base_did(base_did_url)
  }
}

impl Debug for CoreDID {
  fn fmt(&self, f: &mut Formatter<'_>) -> FmtResult {
    f.write_fmt(format_args!("{}", self.as_str()))
  }
}

impl Display for CoreDID {
  fn fmt(&self, f: &mut Formatter<'_>) -> FmtResult {
    f.write_fmt(format_args!("{}", self.as_str()))
  }
}

impl AsRef<str> for CoreDID {
  fn as_ref(&self) -> &str {
    self.0.as_ref()
  }
}

impl FromStr for CoreDID {
  type Err = DIDError;

  fn from_str(string: &str) -> Result<Self, Self::Err> {
    Self::parse(string)
  }
}

impl TryFrom<&str> for CoreDID {
  type Error = DIDError;

  fn try_from(other: &str) -> Result<Self, Self::Error> {
    Self::parse(other)
  }
}

impl TryFrom<String> for CoreDID {
  type Error = DIDError;

  fn try_from(other: String) -> Result<Self, Self::Error> {
    Self::parse(other)
  }
}

impl From<CoreDID> for String {
  fn from(did: CoreDID) -> Self {
    did.into_string()
  }
}

impl Diff for CoreDID {
  type Type = DiffString;

  fn diff(&self, other: &Self) -> identity_core::diff::Result<Self::Type> {
    self.to_string().diff(&other.to_string())
  }

  fn merge(&self, diff: Self::Type) -> identity_core::diff::Result<Self> {
    self
      .to_string()
      .merge(diff)
      .and_then(|this| Self::parse(&this).map_err(identity_core::diff::Error::merge))
  }

  fn from_diff(diff: Self::Type) -> identity_core::diff::Result<Self> {
    String::from_diff(diff).and_then(|this| Self::parse(&this).map_err(identity_core::diff::Error::convert))
  }

  fn into_diff(self) -> identity_core::diff::Result<Self::Type> {
    self.to_string().into_diff()
  }
}

impl PartialEq<str> for CoreDID {
  fn eq(&self, other: &str) -> bool {
    self.as_str() == other
  }
}

impl PartialEq<&'_ str> for CoreDID {
  fn eq(&self, other: &&'_ str) -> bool {
    self == *other
  }
}

impl PartialEq<&CoreDID> for CoreDID {
  fn eq(&self, other: &&CoreDID) -> bool {
    self == other
  }
}

/// Checks whether a character satisfies DID method name constraints:
/// { 0-9 | a-z }
#[inline(always)]
pub(crate) const fn is_char_method_name(ch: char) -> bool {
  matches!(ch, '0'..='9' | 'a'..='z')
}

/// Checks whether a character satisfies DID method-id constraints:
/// { 0-9 | a-z | A-Z | . | - | _ | : }
#[inline(always)]
pub(crate) const fn is_char_method_id(ch: char) -> bool {
  matches!(ch, '0'..='9' | 'a'..='z' | 'A'..='Z' | '.' | '-' | '_' | ':')
}

#[cfg(test)]
mod tests {
  use super::*;

  #[test]
  fn test_core_did_valid() {
    assert_eq!(
      CoreDID::parse("did:example:123456890").unwrap(),
      "did:example:123456890"
    );
    assert_eq!(
      CoreDID::parse("did:iota:main:123456890").unwrap(),
      "did:iota:main:123456890"
    );
  }

  #[test]
  fn test_core_did_invalid() {
    assert!(CoreDID::parse("").is_err());
    assert!(CoreDID::parse("did:").is_err());
    assert!(CoreDID::parse("dad:example:123456890").is_err());
  }

  proptest::proptest! {
    #[test]
    fn test_fuzz_core_did_valid(s in r"did:[a-z0-9]{1,10}:[a-zA-Z0-9\.\-_:]{1,60}") {
      assert_eq!(CoreDID::parse(&s).unwrap().as_str(), &s);
    }

    #[test]
    fn test_fuzz_core_did_no_panic(s in "\\PC*") {
      assert!(CoreDID::parse(&s).is_err());
    }

    #[test]
    fn test_fuzz_set_method_name_no_panic(s in "\\PC*") {
      let mut did = CoreDID::parse("did:example:1234567890").unwrap();
      let _ = did.set_method_id(&s);
    }

    #[test]
    fn test_fuzz_set_method_id_no_panic(s in "\\PC*") {
      let mut did = CoreDID::parse("did:example:1234567890").unwrap();
      let _ = did.set_method_name(&s);
    }
  }
}
