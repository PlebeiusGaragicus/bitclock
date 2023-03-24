I'm trying to write a javascript application that will host a simple website that displays the current bitcoin block height in a large font.  The application uses an API call to a local bitcoin node to get the information.  I'm not sure if ZeroMQ would work for this, but I'm open to suggestions.  I have just been using RPC calls.  I'm also open to suggestions on how to make the application more efficient.  I don't know javascript, but I'm trying to learn.  I need help getting started with public/index.html and public/index.js





    var blockHeight = 0;
    var url = "https://blockchain.info/q/getblockcount";
    var request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send(null);
    blockHeight = request.responseText;
    document.getElementById("blockHeight").innerHTML = blockHeight;




    var blockHeight = 0;
    var url = "http://localhost:8332";
    var request = new XMLHttpRequest();
    request.open("POST", url, false);
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify({"jsonrpc": "1.0", "id":"curltest", "method": "getblockcount", "params": []}));
    blockHeight = JSON.parse(request.responseText).result;
    document.getElementById("blockHeight").innerHTML = blockHeight;