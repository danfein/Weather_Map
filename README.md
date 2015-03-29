# Weather_Map
RGB LED Weather Map

Watching the weather nationwide at a glance, see temperatures rise and fall, watch the rain fall, all from a wireless, wall mounted installation.

A node.js script talks to the weather underground API and asks for the temperature and precip status of the 100 latitude/longitude points mapped to the LEDs and sends the spark core a list. The spark then changes the led colors based on the list it receives.

Much of the credit for the code for this project belongs to Adam Williams, thanks again for all the help!
