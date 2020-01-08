//---------PIM helper functions-----------------------------------------------------------
/*
 currently PmWiki backend
   could use http://fabien.benetou.fr/Site/AllRecentChanges?action=source to check for update
   heavy but nearly no processing required
   enough if done once per minute or so
   if update, request serverrender on modified page
     IFF it's being displayed
 planned Evernote backend
   https://github.com/evernote/evernote-sdk-js
   https://github.com/wanasit/everest-js
   https://stackoverflow.com/questions/24580588/how-to-list-all-the-notes-from-an-evernote-notebook-javascript-node-js
   https://dev.evernote.com/doc/articles/polling_notification.php
 or other popular PIMs
   https://developers.trello.com/
   http://www.xmind.net/developer/
 ideally with webhooks on a backend abstraction with coherent API 
   
*/
  
  function pimvrSaveItemsStates(callback) {
    function updateItemsStates(globalStates){    
      let pageStates = {};
      let [group, page] = getPageGroup();
      let elements = document.body.querySelectorAll('.pimvr-item');
      for (let item of elements) {
        let id = item.getAttribute("id");
        let position = item.getComputedAttribute("position");
        pageStates[id] = {"position": position};
      }
      globalStates[group+"_"+page] = pageStates;
      pimvrSaveRemote("ItemsStates", JSON.stringify(globalStates));
      return "Items states saved";
      
    }
    pimvrLoadRemote("ItemsStates", updateItemsStates);
  }  
  
  function pimvrSaveConfiguration(callback) {
    let configuration = {};
    let elements = document.body.querySelectorAll('.pimvr-configuration');
    for (let item of elements) {
      let id = item.getAttribute("id");
      let position = item.getComputedAttribute("position");
      configuration[id] = {"position": position};
    }
    
    pimvrSaveRemote("Configuration", JSON.stringify(configuration));
    return "Configuration saved";
  }
  
  function pimvrLoadIoTData(callback) {
    // should give min/max ranges, here seems to be 0-1010
    // to use (once normalized) as an attribute value
    // used on http://jsbin.com/nucanat/edit?html,output
    // warning HTTPS on tick is really hammering
    const readURL = "https://fabien.benetou.fr/PIMVRdata/IoTData?action=source";
    
    var myRequest = new XMLHttpRequest();
    myRequest.open('GET', readURL);
    myRequest.onreadystatechange = function () {
      if (myRequest.readyState === 4) {
        callback(myRequest.responseText);
      }
    };
    myRequest.send();
  }  
  
  function pimvrServerRender(group, page, callback) {
    const readURL = "https://fabien.benetou.fr/"+group+"/"+page+"?action=serverrender";
    
    var myRequest = new XMLHttpRequest();
    myRequest.open('GET', readURL);
    myRequest.onreadystatechange = function () {
      if (myRequest.readyState === 4) {
        callback(JSON.parse(myRequest.responseText).res);
      }
    };
    myRequest.send();
  }
  
  function pimvrLoadRemoteSmarthWatchConfiguration(callback) {
    
    const readURL = "https://fabien.benetou.fr/PIMVRdata/SmartWatchConfiguration?action=source";
    
    var myRequest = new XMLHttpRequest();
    myRequest.open('GET', readURL);
    myRequest.onreadystatechange = function () {
      if (myRequest.readyState === 4) {
        callback(JSON.parse(myRequest.responseText));
      }
    };
    myRequest.send();
  }
  //pimvrLoadRemoteSmarthWatchConfiguration(console.log);
  //   usage unclear, can be used as
  //     haptic feedback on interactible items e.g. vibrate on gaze
  //     controller backup e.g. gaze+click
  //     controller locator e.g. making 2 bright columns
  //     heart rate monitor (sadly not with PebbleTime) to reshape experience
  
  function pimvrLoadRemoteMetadata(group, page, callback, query) {
    
    const readURL = "https://fabien.benetou.fr/"+group+"/"+page+"?action=metajson";
    
    var myRequest = new XMLHttpRequest();
    myRequest.open('GET', readURL+"&query="+query, true);
    myRequest.onreadystatechange = function () {
      if (myRequest.readyState === 4) {
        callback(JSON.parse(myRequest.responseText));
      }
    };
    myRequest.send();
  }

  function pimvrLoadRemote(page, callback) {
    
    const readURL = "https://fabien.benetou.fr/PIMVRdata/"+page+"?action=source";
    // assumes JSON
    
    var myRequest = new XMLHttpRequest();
    myRequest.open('GET', readURL);
    myRequest.onreadystatechange = function () {
      if (myRequest.readyState === 4) {
        callback(JSON.parse(myRequest.responseText));
      }
    };
    myRequest.send();
  }
    
  function pimvrSaveRemote(page, data) {
    const writeURL = "https://fabien.benetou.fr/PIMVRdata/"+page+"?action=edit";
    
    var myWriteRequest = new XMLHttpRequest();
    myWriteRequest.open('POST', writeURL, true);
    myWriteRequest.setRequestHeader("Content-Type",
     "application/x-www-form-urlencoded");
    myWriteRequest.onreadystatechange = function () {
      if (myWriteRequest.readyState === 4) {
        //console.log(myWriteRequest.responseText);
        console.log("Save on "+page+" sucessful");
      }
    };
    console.log("trying to open "+writeURL+"post=1&author=PIMVR&authpw=edit_password&text="+data)
    myWriteRequest.send("post=1&author=PIMVR&authpw=edit_password&text="+data);
    // cf http://www.pmwiki.org/wiki/PmWiki/EditingAPI
  }
  
function loadRemoteGraph(callback, params){
  const myDataURL = "https://vatelier.net/MyDemo/newtooling/wiki_graph.json";
  // not that as agressive as it gets cached
  
	var myRequest = new XMLHttpRequest();
	myRequest.open('GET', myDataURL);
	myRequest.onreadystatechange = function () {
		if (myRequest.readyState === 4) {
      //window.PIMgraph = JSON.parse(myRequest.responseText).Nodes;
      callback(JSON.parse(myRequest.responseText).Nodes, params);
		}
	};
	myRequest.send();
}

function getMyNeighbours(nodes, page){
  console.log(nodes[page].Targets);
}
  
function getPageGroup(){   
    let group = QueryString.group || "Main";
    let page = QueryString.page || "HomePage";
    return [group, page];
}
  
