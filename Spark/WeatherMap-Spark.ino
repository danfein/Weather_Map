#include "application.h"
//#include "spark_disable_wlan.h" (for faster local debugging only)
#include "neopixel/neopixel.h"

// IMPORTANT: Set pixel COUNT, PIN and TYPE
#define PIXEL_PIN D2
#define PIXEL_COUNT 100
#define PIXEL_TYPE WS2812B

Adafruit_NeoPixel strip = Adafruit_NeoPixel(PIXEL_COUNT, PIXEL_PIN, PIXEL_TYPE);
Adafruit_NeoPixel rain = Adafruit_NeoPixel(PIXEL_COUNT, PIXEL_PIN, PIXEL_TYPE);
Adafruit_NeoPixel heat = Adafruit_NeoPixel(PIXEL_COUNT, PIXEL_PIN, PIXEL_TYPE);

void setup() 
{
  strip.begin();
  Spark.function("rainbow", call_rainbow);
  Spark.function("heatmap", call_heatmap);
  Spark.function("rainmap", call_rainmap);
  strip.show(); // Initialize all pixels to 'off'
}
void loop() 
{
    //loop_rainbow(1);
    //loop_heatmap(3000);
    //loop_rainmap(3000);
    
}

int call_rainmap(String number) {
    
    
    rain.show();
    
    int delim_index = 0;
    int start_index = 0;
    int second_index = 0;
    //String loc = number.substring(0, delim_index);
    //String val = number.substring(delim_index+1, number.length());
    
    //uint16_t[] vals = new uint16_t[100];
    
    for(int i=0; i<5; i++) {
        
        delim_index = number.indexOf(':', start_index);
        second_index = number.indexOf(';', delim_index);
        
        String loc = number.substring(start_index, delim_index);
        String val = number.substring(delim_index+1, second_index);
        
        start_index = second_index+1;
        
        int pos = loc.toInt();
        int col = val.toInt();
        
        //uint16_t[i] = col;
        uint16_t num16 = pos;
        uint16_t col16 = col;
        rain.setPixelColor(num16, Wheel(col16 & 255));
    }
    
    rain.setBrightness(25);
    
    //rain.show();
    //rainbow(5);
    delay(20);
    return 0;
}

int call_heatmap(String number) {
    
    heat.show();
    
    int delim_index = 0;
    int start_index = 0;
    int second_index = 0;
    //String loc = number.substring(0, delim_index);
    //String val = number.substring(delim_index+1, number.length());
    
    //uint16_t[] vals = new uint16_t[100];
    
    for(int i=0; i<5; i++) {
        
        delim_index = number.indexOf(':', start_index);
        second_index = number.indexOf(';', delim_index);
        
        String loc = number.substring(start_index, delim_index);
        String val = number.substring(delim_index+1, second_index);
        
        start_index = second_index+1;
        
        int pos = loc.toInt();
        int temp = val.toInt();
        
        //uint32_t col = 0;
        uint16_t num16 = pos;
         
        if(temp < 30) {
            heat.setPixelColor(num16, 0, 164, 255);
        } else if (temp < 40) {
            heat.setPixelColor(num16, 255, 0, 255);
        } else if (temp < 45) {
            heat.setPixelColor(num16, 255, 127, 0);
        } else if (temp < 50) {
            heat.setPixelColor(num16, 255, 206, 0);
        } else if (temp < 55) {
            heat.setPixelColor(num16, 255, 254, 0);
        } else if (temp < 60) {
            heat.setPixelColor(num16, 230, 255, 1);
        } else if (temp < 65) {
            heat.setPixelColor(num16, 203, 255, 0);
        } else if (temp < 70) {
            heat.setPixelColor(num16, 174, 255, 0);
        } else if (temp < 75) {
            heat.setPixelColor(num16, 153, 255, 0);
        } else if (temp < 80) {
            heat.setPixelColor(num16, 127, 255, 0);
        } else {
            heat.setPixelColor(num16, 7, 255, 0);
        }
        
        //uint16_t[i] = col;
        //uint16_t num16 = pos;
        //uint16_t col16 = col;
        //heat.setPixelColor(num16, Wheel(col16 & 255));
        //heat.setPixelColor(num16, col);
    }

    heat.setBrightness(25);

    heat.show();
    //rainbow(5);
    delay(20);
    return 0;
}

int call_rainbow(String number) {
    rainbow(5);
}

void loop_rainbow(uint8_t wait) {
  uint16_t i, j, k;
  
  for(int k=0; k<wait; k++) {
    for(j=0; j<256; j++) {
        for(i=0; i<strip.numPixels(); i++) {
            strip.setPixelColor(i, Wheel((i+j) & 255));
        }
        strip.show();
        delay(20);
    }
    //delay(100);
  }
}

void loop_rainmap(int wait) {
    
    rain.show();
    delay(wait);
}

void loop_heatmap(int wait) {
    
    heat.show();
    delay(wait);
}

void rainbow(uint8_t wait) {
  uint16_t i, j;

  for(j=0; j<256; j++) {
    for(i=0; i<strip.numPixels(); i++) {
      strip.setPixelColor(i, Wheel((i+j) & 255));
    }
    strip.show();
    delay(wait);
  }
}

// Input a value 0 to 255 to get a color value.
// The colours are a transition r - g - b - back to r.
uint32_t Wheel(byte WheelPos) {
  if(WheelPos < 85) {
   return strip.Color(WheelPos * 3, 255 - WheelPos * 3, 0);
  } else if(WheelPos < 170) {
   WheelPos -= 85;
   return strip.Color(255 - WheelPos * 3, 0, WheelPos * 3);
  } else {
   WheelPos -= 170;
   return strip.Color(0, WheelPos * 3, 255 - WheelPos * 3);
  }
}