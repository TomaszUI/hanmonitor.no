(function(){
  const CONSENT_KEY='han_analytics_consent';
  const VISITOR_KEY='han_visit_id_v1';
  const ENDPOINT='https://diiskstationtom.tailc58e5f.ts.net/api/visit';

  function getVisitorId(){
    let id=localStorage.getItem(VISITOR_KEY);
    if(!id){
      id=(window.crypto&&crypto.randomUUID)?crypto.randomUUID():(Date.now().toString(36)+'-'+Math.random().toString(36).slice(2)+'-'+Math.random().toString(36).slice(2));
      localStorage.setItem(VISITOR_KEY,id);
    }
    return id;
  }

  function send(){
    if(localStorage.getItem(CONSENT_KEY)!=='yes') return;
    const body=JSON.stringify({visitor_id:getVisitorId()});
    fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body,keepalive:true}).catch(function(){});
  }

  window.hanRecordVisit=send;
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',send,{once:true}); else send();
})();
