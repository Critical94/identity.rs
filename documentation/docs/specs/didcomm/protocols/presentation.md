---
title: Presentation
sidebar_label: Presentation
---

:::info

The IOTA DIDComm Specification is in the RFC phase and may undergo changes. Suggestions are welcome at [GitHub #464](https://github.com/iotaledger/identity.rs/discussions/464).

:::

- Version: 0.1
- Status: `IN-PROGRESS`
- Last Updated: 2021-10-29

## Overview

Allows presentation of one or more [verifiable credentials](https://www.w3.org/TR/vc-data-model) that are issued to a [holder](#roles) and are uniquely presented to a third-party [verifier](#roles) through [verifiable presentations](https://www.w3.org/TR/vc-data-model/#presentations).

### Relationships
- [Issuance](./issuance): a presentation may be used to provide extra information from the [holder](#roles) during a credential issuance.
- [Authentication](./authentication): a presentation may be used after authentication to prove the authenticated DID is bound to a physical identity.

### Example Use-Cases

- A company founder wants to prove they have a bank account in order to apply for insurance.
- A traveler proves to the border agency that they have a valid visa.
- An IoT device wants to prove who manufactured, installed, and benchmarked the device.

### Roles
- [Holder](https://www.w3.org/TR/vc-data-model/#dfn-holders): possesses one or more credentials that are combined in a verifiable presentation to show proof of ownership to the verifier.
- [Verifier](https://www.w3.org/TR/vc-data-model/#dfn-verifier): receives and validates the credentials presented by the holder.

### Interaction

<div style={{textAlign: 'center'}}>

![PresentationDiagram](/img/didcomm/presentation.drawio.svg)

<sub>For guidance on diagrams see the <a href="../overview#diagrams">corresponding section in the overview</a>.</sub>

</div>


## Messages

### 1. presentation-offer {#presentation-offer}

- Type: `iota/presentation/0.1/presentation-offer`
- Role: [holder](#roles)

Sent by the [holder](#roles) to offer one or more credentials for a [verifier](#roles) to view. [`CredentialInfo`](../resources/credential-info) is used to indicate which kinds of credentials the [holder](#roles) wants to present.

#### Structure
```json
{
  "offers": [CredentialInfo], // REQUIRED
  "requireSignature": bool,   // OPTIONAL
}
```

| Field | Description | Required |
| :--- | :--- | :--- |
| `offers` | Array of one or more [`CredentialInfo`](../resources/credential-info), each specifying a single credential possessed by the holder.[^1] | ✔ |
| `requireSignature` | Request that the [verifier](#roles) use a [signed DIDComm message][SDM] for non-repudiation of the [`presentation-request`](#presentation-request). The [holder](#roles) SHOULD issue a `problem-report` if the [verifier](#roles) does not sign the message when this is `true`. Default: `false`. | ✖ | 

[^1] With [CredentialType2021], the `type` MAY be under-specified to preserve privacy but SHOULD always include the most general types. For example, a credential with the types `["VerifiableCredential", "DriversLicence", "EUDriversLicence", "GermanDriversLicence"]` could be specified as `["VerifiableCredential", "DriversLicence"]`.

#### Examples

1. Offer a single verifiable credential:

```json
{
  "offers": [{
    "credentialInfoType": "CredentialType2021",
    "type": ["VerifiableCredential", "UniversityDegreeCredential"],
    "issuer": "did:example:76e12ec712ebc6f1c221ebfeb1f"
  }]
}
```

2. Offer two verifiable credentials with different issuers:

```json
{
  "offers": [{
    "credentialInfoType": "CredentialType2021",
    "type": ["VerifiableCredential", "UniversityDegreeCredential"],
    "issuer": "did:example:76e12ec712ebc6f1c221ebfeb1f"
  }, 
  {
    "credentialInfoType": "CredentialType2021",
    "type": ["VerifiableCredential", "UniversityDegreeCredential"],
    "issuer": "https://example.edu/issuers/565049"
  }]
}
```

### 2. presentation-request {#presentation-request}

- Type: `iota/presentation/0.1/presentation-request`
- Role: [verifier](#roles)

Sent by the [verifier](#roles) to request one or more verifiable credentials from a [holder](#roles). [`CredentialInfo`](../resources/credential-info) indicates which kinds of credentials the [verifier](#roles) wants presented by the [holder](#roles).

[Verifiers](#roles) are RECOMMENDED to use a [signed DIDComm message][SDM]. [Holders](#roles) may choose to blocklist verifiers that refuse to provide signed requests.

#### Structure
```json
{
  "requests": [{
    "credentialInfo": CredentialInfo,   // REQUIRED
    "optional": bool                    // OPTIONAL
  }], // REQUIRED
  "challenge": string,                  // REQUIRED
}
```

| Field | Description | Required |
| :--- | :--- | :--- |
| `requests` | Array of one or more requests, each specifying a single credential possessed by the holder. | ✔ |
| `credentialInfo` | A [`CredentialInfo`](../resources/credential-info), specifying a credential requested by the verifier.[^1] | ✔ |
| `optional` | Whether this credential is required (`false`) or optional (`true`) to present by the holder. A holder SHOULD send a problem report if unable to satisfy a non-optional credential request. Default: `false`. | ✖ |
| [`challenge`](https://w3c-ccg.github.io/ld-proofs/#dfn-challenge) | A random string unique per [`presentation-request`](#presentation-request) by a verifier to help mitigate replay attacks. | ✔ |

[^3] Verifiers are RECOMMENDED to include a proof whenever possible to avoid rejections from holders that enforce non-repudiation. Holders could use this to prove that a verifier is non-compliant with laws or regulations, e.g. over-requesting information protected by [GDPR](https://gdpr-info.eu/). Holders MAY still choose to accept unsigned [`presentation-requests`](#presentation-request) on a case-by-case basis, even if `requireSignature` was `true` in their [`presentation-offer`](#presentation-offer), as some verifiers may be unable to perform cryptographic signing operations. If the `proof` is invalid, the receiving holder MUST send a `problem-report`.

#### Examples

1. Request a single credential matching both specified types using [CredentialType2021].

```json
{
  "requests": [{
    "credentialInfo": {
      "credentialInfoType": "CredentialType2021",
      "type": ["VerifiableCredential", "UniversityDegreeCredential"]
    }
  }],
  "challenge": "06da6f1c-26b0-4976-915d-670b8f407f2d"
}
```

2. Request a required credential using [CredentialType2021] from a particular trusted issuer and an optional credential. 

```json
{
  "requests": [{
    "credentialInfo": {
      "credentialInfoType": "CredentialType2021",
      "type": ["VerifiableCredential", "UniversityDegreeCredential"],
      "trustedIssuer": ["did:example:76e12ec712ebc6f1c221ebfeb1f"]
    }
  }, {
    "credentialInfo": {
      "credentialInfoType": "CredentialType2021",
      "type": ["VerifiableCredential", "DriversLicence"]
    },
    "optional": true
  }], 
  "challenge": "06da6f1c-26b0-4976-915d-670b8f407f2d",
}
```

3. Request a single credential using [CredentialType2021] signed by one of several trusted issuers.

```json
{
  "requests": [{
    "credentialInfo": {
      "credentialInfoType": "CredentialType2021",
      "type": ["VerifiableCredential", "UniversityDegreeCredential"],
      "trustedIssuer": ["did:example:76e12ec712ebc6f1c221ebfeb1f", "did:example:f1befbe122c1f6cbe217ce21e67", "did:example:c6ef1fe11eb22cb711e6e227fbc"]
    },
    "optional": false
  }], 
  "challenge": "06da6f1c-26b0-4976-915d-670b8f407f2d",
}
```

### 3. presentation {#presentation}

- Type: `iota/presentation/0.1/presentation`
- Role: [holder](#roles)

Sent by the holder to present a [verifiable presentation][VP] of one or more [verifiable credentials](https://www.w3.org/TR/vc-data-model/#credentials) for a [verifier](#roles) to review.

#### Structure
```json
{
  "presentation": VerifiablePresentation // REQUIRED
}
```

| Field | Description | Required |
| :--- | :--- | :--- |
| [`presentation`][VP] | Signed [verifiable presentation][VP] containing one or more [verifiable credentials](https://www.w3.org/TR/vc-data-model/#credentials) matching the [presentation-request](#presentation-request).[^1][^2] | ✔ |

[^1] The [`proof`](https://www.w3.org/TR/vc-data-model/#proofs-signatures) section in `presentation` MUST include the `challenge` sent by the verifier in the preceding [`presentation-request`](#presentation-request). Revoked, disputed, or otherwise invalid presentations or credentials MUST result in a rejected [`presentation-result`](#presentation-result) sent back to the holder, NOT a separate [`problem-report`]. Other such as the message lacking [sender authenticated encryption][SAE] SHOULD result in a separate [`problem-report`].

[^2] With [CredentialType2021], the included credentials SHOULD match all `type` fields and one or more `issuer` if included in the [`presentation-request`](#presentation-request). 

#### Examples

1. Presentation of a verifiable presentation credential.

```json
{
  "presentation": {
    "@context": [
      "https://www.w3.org/2018/credentials/v1",
      "https://www.w3.org/2018/credentials/examples/v1"
    ],
    "type": "VerifiablePresentation",
    "verifiableCredential": [{
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.w3.org/2018/credentials/examples/v1"
      ],
      "id": "6c1a1477-e452-4da7-b2db-65ad0b369d1a",
      "type": ["VerifiableCredential", "UniversityDegreeCredential"],
      "issuer": "did:example:76e12ec712ebc6f1c221ebfeb1f",
      "issuanceDate": "2021-05-03T19:73:24Z",
      "credentialSubject": {
        "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
        "degree": {
          "type": "BachelorDegree",
          "name": "Bachelor of Science and Arts"
        }
      },
      "proof": { ... }
    }],
    "proof": {
      "challenge": "06da6f1c-26b0-4976-915d-670b8f407f2d",
      ...
    }
  }
}
```

### 4. presentation-result {#presentation-result}

- Type: `iota/presentation/0.1/presentation-result`
- Role: [verifier](#roles)

Sent by the verifier to communicate the result of the presentation. It allows the verifier to raise disputes encountered in the verification. The message SHOULD be signed by the verifier for non-repudiation.

Similar to [`presentation-request`](#presentation-request), [verifiers](#roles) are RECOMMENDED to use a [signed DIDComm message][SDM] whenever possible for non-repudiation of receipt of the presentation. [Holders](#roles) may choose to blocklist verifiers that refuse to provide signatures or do not send a [presentation-result](#presentation-result) at all.

If the [presentation-result](#presentation-result) contains `disputes` or a problem report was issued, the protocol may be restarted to retry the presentation. [Verifiers](#roles) may choose to only request the failed credential kinds in the retry, retaining the accepted credentials from the failed presentation.

#### Structure
```json
{
  "accepted": bool,                   // REQUIRED
  "disputes": [{
    "credentialId": string,           // REQUIRED
    "dispute": Dispute,               // REQUIRED
  }], // OPTIONAL
}
```

| Field | Description | Required |
| :--- | :--- | :--- |
| `accepted` | Indicates if the verifier accepted the [`presentation`](#presentation) and credentials. | ✔ |
| `disputes` | Array of disputes | ✖ |
| [`credentialId`](https://www.w3.org/TR/vc-data-model/#identifiers) | Identifier of the credential for which there is a dispute. If the credential lacks an `id` field, this should be a content-addressed identifier; we RECOMMEND the [SHA-256 digest](https://www.rfc-editor.org/rfc/rfc4634) of the credential.  | ✔ |

#### Examples

1. Successful result:

```json
{
  "accepted": true,
}
```

2. Unsuccessful result disputing a credential's content: 

```json
{
  "accepted": false,
  "disputes": [{
    "id": "http://example.com/credentials/123",
    "dispute": {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.w3.org/2018/credentials/examples/v1"
      ],
      "id": "http://example.com/credentials/123",
      "type": ["VerifiableCredential", "DisputeCredential"],
      "credentialSubject": {
        "id": "http://example.com/credentials/245",
        "currentStatus": "Disputed",
        "statusReason": {
          "value": "Address is out of date.",
          "lang": "en"
        },
      },
      "issuer": "did:example:76e12ec712ebc6f1c221ebfeb1f",
      "issuanceDate": "2017-12-05T14:27:42Z",
      "proof": { ... }
    }
  }],
}
```

### Problem Reports {#problem-reports}

The following problem-report codes may be raised in the course of this protocol and are expected to be recognised and handled in addition to any general problem-reports. Implementers may also introduce their own application-specific problem-reports.

For guidance on problem-reports and a list of general codes see [problem reports](../resources/problem-reports).

| Code | Message | Description |
| :--- | :--- | :--- |
| `e.p.msg.iota.presentation.reject-offer` | [presentation-offer](#presentation-offer) | [Verifier](#roles) rejects a presentation offer for any reason, e.g. unrecognised type or untrusted issuer. |
| `e.p.msg.iota.presentation.reject-offer.invalid-type` | [presentation-offer](#presentation-offer) | [Verifier](#roles) rejects a presentation offer due to a `type` or `@context` being unsupported or otherwise invalid. |
| `e.p.msg.iota.presentation.reject-offer.invalid-issuer` | [presentation-offer](#presentation-offer) | [Verifier](#roles) rejects a presentation offer due to `issuer` being unrecognised, untrusted or otherwise invalid.  |
| `e.p.msg.iota.presentation.reject-offer.reject-require-signature` | [presentation-offer](#presentation-offer) | [Verifier](#roles) rejects a presentation offer due to being unable or unwilling to provide a signature for the following [presentation-request](#presentation-request) |
| `e.p.msg.iota.presentation.reject-request` | [presentation-request](#presentation-request) | [Holder](#roles) rejects a request for any reason. |
| `e.p.msg.iota.presentation.reject-request.invalid-type` | [presentation-request](#presentation-request) | [Holder](#roles) rejects a request due to a `type` or `@context` being unsupported or otherwise invalid. |
| `e.p.msg.iota.presentation.reject-request.invalid-issuer` | [presentation-request](#presentation-request) | [Holder](#roles) rejects a request due to a `issuer` being unsupported or otherwise invalid. |
| `e.p.msg.iota.presentation.reject-request.missing-signature` | [presentation-request](#presentation-request) | [Holder](#roles) rejects a request due to a missing signature from the [verifier](#roles). The [holder](#roles) may choose to blocklist [verifiers](#roles) that fail to sign requests. |
| `e.p.msg.iota.presentation.reject-presentation` | [presentation](#presentation) | [Verifier](#roles) rejects a presentation and abandons the protocol for any reason other than disputed verifiable credential content, which should instead be communicated via [presentation-result](#presentation-result). |
| `e.p.msg.iota.presentation.reject-result` | [presentation-result](#presentation-result) | [Holder](#roles) rejects a result for any reason. |
| `e.p.msg.iota.presentation.reject-result.missing-signature` | [presentation-result](#presentation-result) | [Holder](#roles) rejects a result due to a missing signature requested from the [verifier](#roles). The [holder](#roles) may blocklist the [verifier](#roles) from future requests. |
| `e.p.msg.iota.presentation.reject-retry` | [presentation-result](#presentation-result) | [Holder](#roles) chooses not to retry the presentation flow and terminates the protocol. |

## Considerations

This section is non-normative.

- **Security**: implementors SHOULD transmit the presentation over an encrypted channel etc. [see authentication](./authentication.md).
- **Authentication**: it is RECOMMENDED to use either the [authentication protocol](./authentication.md) for once-off mutual authentication or to establish [sender-authenticated encryption][SAE] for continuous authentication of both parties in the DIDComm thread. Signatures (`proof` fields) and [signed DIDComm messages][SDM] SHOULD NOT be relied upon for this in general: https://identity.foundation/didcomm-messaging/spec/#didcomm-signed-message
- **Authorisation**: establishing whether either party is allowed to request/offer presentations is an application-level concern.
- **Validation**: apart from verifying the presentation and credentials are signed by a trusted issuer, how credential subject matter fields are checked for disputes is out-of-scope.

## Unresolved Questions

- Is a `schema` field needed for the `presentation-offer` and `presentation-request` to identify the types of verifiable credentials and allow forward compatibility for different fields in the message? E.g. a `SelectiveDisclosure` or ZKP message may only offer or request certain fields in the credential. Does this relate to the [`credentialSchema`](https://www.w3.org/TR/vc-data-model/#data-schemas) field in credentials?
- Use `schemas` to negotiate generic form entries as a self-signed credential? E.g. could ask for username, preferred language, comments, any generic information not signed/verified by a third-party issuer from a generic wallet? Similar to Presentation Exchange? https://identity.foundation/presentation-exchange/spec/v1.0.0/
- Identifiers (`id` field) are [optional in verifiable credentials](https://www.w3.org/TR/vc-data-model/#identifiers). The spec suggests content-addressed identifiers when the `id` is not available but their particulars are unclear as there is no spec referenced. This affects the `disputes` reported in the [`presentation-result`](#presentation-result).
- We should RECOMMENDED the `id` of a verifiable credential being a UUID (what version?) in issuance. Needs to be a URI https://www.w3.org/TR/vc-data-model/#identifiers, do UUIDs qualify?
- `e.p.msg.iota.presentation.reject-request.invalid-type`, `e.p.msg.iota.presentation.reject-request.invalid-issuer`, `e.p.msg.iota.presentation.reject-request.invalid-issuer` and `e.p.msg.iota.presentation.reject-request.invalid-type` are specific to [CredentialType2021]. Should they be listed here? If yes, should they be marked accordingly?

## Related Work

- Aries Hyperledger: https://github.com/hyperledger/aries-rfcs/tree/main/features/0454-present-proof-v2
- Jolocom: https://jolocom.github.io/jolocom-sdk/1.0.0/guides/interaction_flows/#credential-verification
- Presentation Exchange: https://identity.foundation/presentation-exchange/spec/v1.0.0/

## Further Reading

- [Decentralized Identifiers (DIDs) 1.0](https://www.w3.org/TR/did-core/)
- [Verifiable Credentials Data Model 1.0](https://www.w3.org/TR/vc-data-model)
- [Verifiable Credentials Implementation Guidelines 1.0](https://w3c.github.io/vc-imp-guide/)

<!--- LINKS --->
[VP]: https://www.w3.org/TR/vc-data-model/#presentations-0
[SAE]: https://identity.foundation/didcomm-messaging/spec/#sender-authenticated-encryption
[SDM]: https://identity.foundation/didcomm-messaging/spec/#didcomm-signed-message
[CredentialType2021]: ../resources/credential-info#credentialtype2021
