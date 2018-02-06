/*
 * p15-16
 * Radio Communication Send 
 * Switch on and off every second 
 * 
 */

#include <RCSwitch.h>

// Ok, I just had to define this one
#define WaitASec delay(1000)

// Don't forget to triple check these numbers
#define OnCode  5587989
#define OffCode 5587988
#define CodeLength 24
#define SendPin A5

RCSwitch mySwitch = RCSwitch();

void setup() {
  // Show that setup() is run, even though the execercise doesn't explicitly specify this
  Serial.begin(9600);
  Serial.println("RC receiver");

  // I don't know what protocol 1 is. Oh well.
  mySwitch.enableTransmit(SendPin);
  mySwitch.setProtocol(1);
}

void loop() {
  mySwitch.send(OnCode, CodeLength);
  WaitASec;
  mySwitch.send(OffCode, CodeLength);
  WhaitASec;
}

