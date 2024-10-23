import{W as b}from"./index-6EVKDkLW.js";class c{static getAppId(e){return this.getOverwritableValue(e,"appId")}static getOverwritableValue(e,t){let r=e[t];return e.web&&t in e.web&&(r=e.web[t]),r}static getAuthorizationUrl(e){let t=e.authorizationBaseUrl+"?client_id="+e.appId;if(t+="&response_type="+e.responseType,e.redirectUrl&&(t+="&redirect_uri="+e.redirectUrl),e.scope&&(t+="&scope="+e.scope),t+="&state="+e.state,e.additionalParameters)for(const r in e.additionalParameters)t+="&"+r+"="+e.additionalParameters[r];return e.pkceCodeChallenge&&(t+="&code_challenge="+e.pkceCodeChallenge,t+="&code_challenge_method="+e.pkceCodeChallengeMethod),encodeURI(t)}static getTokenEndpointData(e,t){let r="";return r+=encodeURIComponent("grant_type")+"="+encodeURIComponent("authorization_code")+"&",r+=encodeURIComponent("client_id")+"="+encodeURIComponent(e.appId)+"&",r+=encodeURIComponent("redirect_uri")+"="+encodeURIComponent(e.redirectUrl)+"&",r+=encodeURIComponent("code")+"="+encodeURIComponent(t)+"&",r+=encodeURIComponent("code_verifier")+"="+encodeURIComponent(e.pkceCodeVerifier),r}static getUrlParams(e){const t=`${e??""}`.trim();if(t.length===0)return;const r=new URL(t);if(!r.search&&!r.hash)return;let i;return r.search?i=r.search.substr(1):i=r.hash.substr(1),i.split("&").reduce((s,l)=>{const[a,o]=l.split("=");if(a&&a.length>0)return Object.assign(Object.assign({},s),{[a]:decodeURIComponent(o)})},{})}static randomString(e=10){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";let r;if(window.crypto){let i=new Uint32Array(e);window.crypto.getRandomValues(i),i=i.map(s=>t.charCodeAt(s%t.length));let n=[];i.forEach(s=>{n.push(t.charAt(s%t.length))}),r=n.join("")}else{r="";for(let i=0;i<e;i++)r+=t.charAt(Math.floor(Math.random()*t.length))}return r}static async buildWebOptions(e){const t=new E;t.appId=this.getAppId(e),t.authorizationBaseUrl=this.getOverwritableValue(e,"authorizationBaseUrl"),t.responseType=this.getOverwritableValue(e,"responseType"),t.responseType||(t.responseType="token"),t.redirectUrl=this.getOverwritableValue(e,"redirectUrl"),t.resourceUrl=this.getOverwritableValue(e,"resourceUrl"),t.accessTokenEndpoint=this.getOverwritableValue(e,"accessTokenEndpoint"),t.pkceEnabled=this.getOverwritableValue(e,"pkceEnabled"),t.pkceEnabled&&(t.pkceCodeVerifier=this.randomString(64),w.HAS_SUBTLE_CRYPTO?await w.deriveChallenge(t.pkceCodeVerifier).then(n=>{t.pkceCodeChallenge=n,t.pkceCodeChallengeMethod="S256"}):(t.pkceCodeChallenge=t.pkceCodeVerifier,t.pkceCodeChallengeMethod="plain")),t.scope=this.getOverwritableValue(e,"scope"),t.state=this.getOverwritableValue(e,"state"),(!t.state||t.state.length===0)&&(t.state=this.randomString(20));let r=this.getOverwritableValue(e,"additionalParameters");if(r){t.additionalParameters={};for(const n in r)if(n&&n.trim().length>0){let s=r[n];s&&s.trim().length>0&&(t.additionalParameters[n]=s)}}let i=this.getOverwritableValue(e,"additionalResourceHeaders");if(i){t.additionalResourceHeaders={};for(const n in i)if(n&&n.trim().length>0){let s=i[n];s&&s.trim().length>0&&(t.additionalResourceHeaders[n]=s)}}return t.logsEnabled=this.getOverwritableValue(e,"logsEnabled"),t}static buildWindowOptions(e){const t=new E;return e.web&&(e.web.windowOptions&&(t.windowOptions=e.web.windowOptions),e.web.windowTarget&&(t.windowTarget=e.web.windowTarget)),t}}class w{static toUint8Array(e){const t=new ArrayBuffer(e.length),r=new Uint8Array(t);for(let i=0;i<e.length;i++)r[i]=e.charCodeAt(i);return r}static toBase64Url(e){return e.replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}static toBase64(e){let t=e.length,r="";for(let i=0;i<t;i+=3)r+=this.BASE64_CHARS[e[i]>>2],r+=this.BASE64_CHARS[(e[i]&3)<<4|e[i+1]>>4],r+=this.BASE64_CHARS[(e[i+1]&15)<<2|e[i+2]>>6],r+=this.BASE64_CHARS[e[i+2]&63];return t%3===2?r=r.substring(0,r.length-1)+"=":t%3===1&&(r=r.substring(0,r.length-2)+"=="),r}static deriveChallenge(e){return e.length<43||e.length>128?Promise.reject(new Error("ERR_PKCE_CODE_VERIFIER_INVALID_LENGTH")):w.HAS_SUBTLE_CRYPTO?new Promise((t,r)=>{crypto.subtle.digest("SHA-256",this.toUint8Array(e)).then(i=>t(this.toBase64Url(this.toBase64(new Uint8Array(i)))),i=>r(i))}):Promise.reject(new Error("ERR_PKCE_CRYPTO_NOTSUPPORTED"))}}w.BASE64_CHARS="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";w.HAS_SUBTLE_CRYPTO=typeof window<"u"&&!!window.crypto&&!!window.crypto.subtle;class E{constructor(){this.windowTarget="_blank"}}class _ extends b{constructor(){super(...arguments),this.loopCount=2e3,this.intervalLength=100,this.MSG_RETURNED_TO_JS="Returned to JS:"}async refreshToken(e){return new Promise((t,r)=>{r(new Error("Functionality not implemented for PWAs yet"))})}async authenticate(e){const t=c.buildWindowOptions(e);return this.windowHandle=window.open("",t.windowTarget,t.windowOptions),this.webOptions=await c.buildWebOptions(e),new Promise((r,i)=>{if(!this.webOptions.appId||this.webOptions.appId.length==0)i(new Error("ERR_PARAM_NO_APP_ID"));else if(!this.webOptions.authorizationBaseUrl||this.webOptions.authorizationBaseUrl.length==0)i(new Error("ERR_PARAM_NO_AUTHORIZATION_BASE_URL"));else if(!this.webOptions.redirectUrl||this.webOptions.redirectUrl.length==0)i(new Error("ERR_PARAM_NO_REDIRECT_URL"));else if(!this.webOptions.responseType||this.webOptions.responseType.length==0)i(new Error("ERR_PARAM_NO_RESPONSE_TYPE"));else{let n=this.loopCount;this.windowClosedByPlugin=!1;const s=c.getAuthorizationUrl(this.webOptions);this.webOptions.logsEnabled&&this.doLog("Authorization url: "+s),this.windowHandle&&(this.windowHandle.location.href=s),this.intervalId=window.setInterval(()=>{var l,a;if(n--<0)this.closeWindow();else if(!((l=this.windowHandle)===null||l===void 0)&&l.closed&&!this.windowClosedByPlugin)window.clearInterval(this.intervalId),i(new Error("USER_CANCELLED"));else{let o;try{o=(a=this.windowHandle)===null||a===void 0?void 0:a.location.href}catch{}if(o!=null&&o.indexOf(this.webOptions.redirectUrl)>=0){this.webOptions.logsEnabled&&this.doLog("Url from Provider: "+o);let d=c.getUrlParams(o);if(d)if(this.webOptions.logsEnabled&&this.doLog("Authorization response:",d),window.clearInterval(this.intervalId),d.state===this.webOptions.state)if(this.webOptions.accessTokenEndpoint){const u=this;let R=d.code;if(R){const h=new XMLHttpRequest;h.onload=function(){if(this.status===200){let p=JSON.parse(this.response);u.webOptions.logsEnabled&&u.doLog("Access token response:",p),u.requestResource(p.access_token,r,i,d,p)}},h.onerror=function(){u.doLog("ERR_GENERAL: See client logs. It might be CORS. Status text: "+this.statusText),i(new Error("ERR_GENERAL"))},h.open("POST",this.webOptions.accessTokenEndpoint,!0),h.setRequestHeader("accept","application/json"),h.setRequestHeader("cache-control","no-cache"),h.setRequestHeader("content-type","application/x-www-form-urlencoded"),h.send(c.getTokenEndpointData(this.webOptions,R))}else i(new Error("ERR_NO_AUTHORIZATION_CODE"));this.closeWindow()}else this.requestResource(d.access_token,r,i,d);else this.webOptions.logsEnabled&&(this.doLog("State from web options: "+this.webOptions.state),this.doLog("State returned from provider: "+d.state)),i(new Error("ERR_STATES_NOT_MATCH")),this.closeWindow()}}},this.intervalLength)}})}requestResource(e,t,r,i,n=null){if(this.webOptions.resourceUrl){const s=this.webOptions.logsEnabled;if(s&&this.doLog("Resource url: "+this.webOptions.resourceUrl),e){s&&this.doLog("Access token:",e);const l=this,a=new XMLHttpRequest;if(a.onload=function(){if(this.status===200){let o=JSON.parse(this.response);s&&l.doLog("Resource response:",o),o&&l.assignResponses(o,e,i,n),s&&l.doLog(l.MSG_RETURNED_TO_JS,o),t(o)}else r(new Error(this.statusText));l.closeWindow()},a.onerror=function(){s&&l.doLog("ERR_GENERAL: "+this.statusText),r(new Error("ERR_GENERAL")),l.closeWindow()},a.open("GET",this.webOptions.resourceUrl,!0),a.setRequestHeader("Authorization",`Bearer ${e}`),this.webOptions.additionalResourceHeaders)for(const o in this.webOptions.additionalResourceHeaders)a.setRequestHeader(o,this.webOptions.additionalResourceHeaders[o]);a.send()}else s&&this.doLog("No accessToken was provided although you configured a resourceUrl. Remove the resourceUrl from the config."),r(new Error("ERR_NO_ACCESS_TOKEN")),this.closeWindow()}else{const s={};this.assignResponses(s,e,i,n),this.webOptions.logsEnabled&&this.doLog(this.MSG_RETURNED_TO_JS,s),t(s),this.closeWindow()}}assignResponses(e,t,r,i=null){r&&(e.authorization_response=r),i&&(e.access_token_response=i),e.access_token=t}async logout(e){return new Promise((t,r)=>{localStorage.removeItem(c.getAppId(e)),t(!0)})}closeWindow(){var e;window.clearInterval(this.intervalId),(e=this.windowHandle)===null||e===void 0||e.close(),this.windowClosedByPlugin=!0}doLog(e,t=null){console.log("I/Capacitor/OAuth2ClientPlugin: "+e,t)}}export{_ as OAuth2ClientPluginWeb};
