import { initIdentity, defaultClientConfig, setupDOMLog } from "./utils_web.js";
import { createIdentity } from "./create_did.js";
import { createVC } from "./create_vc.js";
import { manipulateIdentity } from "./manipulate_did.js";
import { resolution } from "./resolution.js";
import { createVP } from "./create_vp.js";
import { revokeVC } from "./revoke_vc.js";
import { merkleKey } from "./merkle_key.js";
import { createIdentityPrivateTangle } from "./private_tangle.js";
import { createDiff } from "./diff_chain.js";
import { resolveHistory } from "./resolve_history.js";

export { initIdentity, defaultClientConfig, createIdentity, createVC, manipulateIdentity, resolution, createVP, revokeVC, merkleKey, createIdentityPrivateTangle, createDiff, resolveHistory };

window.onload = async() => {

    setupDOMLog();

    await initIdentity();
    const CLIENT_CONFIG = defaultClientConfig();

    //handle create identity on click event
    document
        .querySelector("#create-identity-btn")
        .addEventListener("click", () => createIdentity(CLIENT_CONFIG));

    //handle resolve DID on click event
    document
        .querySelector("#resolve-did-btn")
        .addEventListener("click", async () => {
            const inputDid = document.querySelector("#resolve-did-input").value;
            const result = await resolution(CLIENT_CONFIG, inputDid);
            console.log(result);
        });

    //handle manipulate DID on click event
    document
        .querySelector("#manipulate_did_btn")
        .addEventListener("click", () => manipulateIdentity(CLIENT_CONFIG));

    //handle create VC on click event
    document
        .querySelector("#create_vc_btn")
        .addEventListener("click", () => createVC(CLIENT_CONFIG));

    //handle create VP on click event
    document
        .querySelector("#create_vp_btn")
        .addEventListener("click", () => createVP(CLIENT_CONFIG));

    //handle revoke VC on click event
    document
        .querySelector("#revoke_vc_btn")
        .addEventListener("click", () => revokeVC(CLIENT_CONFIG));

    //handle merkle key on click event
    document
        .querySelector("#merkle_key_btn")
        .addEventListener("click", () => merkleKey(CLIENT_CONFIG));

    //handle private tangle DID creation on click event
    document
        .querySelector("#private_tangle_btn")
        .addEventListener("click", () => {
            const restURL = document.querySelector("#create-private-rest-url").value;
            const networkName = document.querySelector("#create-private-network-name").value;
            createIdentityPrivateTangle(restURL, networkName);
        });

    //handle diff chain on click event
    document
        .querySelector("#diff_chain_btn")
        .addEventListener("click", () => createDiff(CLIENT_CONFIG));

    //handle resolve history on click event
    document
        .querySelector("#did_history_btn")
        .addEventListener("click", () => resolveHistory(CLIENT_CONFIG));

};