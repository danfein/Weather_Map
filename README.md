# Weather_Map
RGB LED Weather Map

Watching the weather nationwide at a glance, see temperatures rise and fall, watch the rain fall, all from a wireless, wall mounted installation.

A node.js script talks to the Weather Underground API and asks for the temperature and precip status of the 100 latitude/longitude points mapped to the LEDs and sends the spark core a list. The spark then changes the led colors based on the list it receives.

I am able to hit the API as hard as I do because I have an internal API key (I work for WU), if you are using a Free key you will have to slow down the rate of requests. Even if you have a paid key you might slow it down just to reduce costs. You can still get the project to work, it will just populate less often.


Much of the credit for the code for this project belongs to Adam Williams, thanks again for all the help!
