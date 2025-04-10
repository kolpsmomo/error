import{g,aV as l,h as u,aW as p}from"./DMNZWCky.js";const m=t=>{const o=p().public.clientApiBase||window.location.origin,s=g().code,e=o.startsWith("https")?"wss:":"ws:",{hostname:n,port:a}=new URL(o),c=`Bearer ${l()}`,i=u("django_language").value||"",r=`${e}//${n}:${a}${t}?token=${c}&platform=${s}&lang=${i}`;return new WebSocket(r)};export{m as u};
//# sourceMappingURL=_soP7SWV.js.map
