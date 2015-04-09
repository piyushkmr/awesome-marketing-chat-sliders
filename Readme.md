<h1>Awesome Marketing Chat Sliders</h1>
<p>Chat sliders for marketing of your whatsapp group or facebook page (can be scaled to any chat system)</p>
<p>
Chat sliders for showcasing the Whatsapp Group Chat or your Facebook page posts to attract new users to join you. It can be scaled to any chat system that you may want to design for your next project.
</p>
<p>For a demo just got to Demo folder and got to Faceboo-page or Whatsapp-page folder for respective demo.</p>

<h4>How to use</h4>
<h5>The files</h5>
To use each folder in <code>src</code> has three files:
-chat.js (core file for the chat sliders)
-data.js (file from where all the variables are fetched)
-facebook.css/whatsapp.css (the stylesheet for respective pages)
<br>
To use just import all three files:
<pre>
&lt;script type="text/javascript" src="data.js"&gt;&lt;/scirpt&gt;
&lt;script type="text/javascript" src="chat.js"&gt;&lt;/scirpt&gt;
&lt;link type="text/css" rel="stylesheet" href="facebook.css"/&gt;
</pre>
<h5>The HTML</h5>
The best part is that it requires least html setup.
Initialize on any html div element:
<pre>
&lt;div class="chat-box"></div>
</pre>
Then initialize just like any other jQuery plugin:
<pre>
&lt;script>
$('.chat-box').chatSlider();
&lt;/script>
</pre>
<h5>The Javascript</h5>
You don't need to dig into javascript code, but you will have to change variables as per your need.<br>
Go to <code>data.js</code> of any folder in <code>src</code>:
<h6>Facebook</h6>
Contains following variables:
<ul>
<li>message : Json variable for mesage strings</li>
<li>pageUrl : Url of facebook page to be liked</li>
<li>profileName : Profile name to be shown on posts</li>
<li>profilelogo : Profile logo URL (can be absolute or relative to index.html page)</li>
</ul>
<h6>Whatsapp</h6>
Contains following variables:
<ul>
<li>groupName : Group Name to be shown to user</li>
<li>users : list of dummy users can be listed to any users</li>
<li>chat : Json variable for chat messages, keys denote users index from users Array</li>
<li>colors : font color for respective users (input any number of colors)</li>
</ul>