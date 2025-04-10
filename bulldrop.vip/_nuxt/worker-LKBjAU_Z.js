(function(){"use strict";let e=0,t=0,s;function o({price:i,ttl:n}){t=i,e=n,postMessage(`${e/t}`),clearTimeout(s),s=setTimeout(a,1e3)}function a(){e>0&&(e-=1,e>0&&(s=setTimeout(a,1e3))),postMessage(`${e/t}`)}onmessage=i=>o(i.data)})();
//# sourceMappingURL=worker-LKBjAU_Z.js.map
