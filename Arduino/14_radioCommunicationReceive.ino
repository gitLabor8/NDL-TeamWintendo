/*
 * p14-15
 * Radio Communication
 * Note: RC = Radio Control
 * https://images-na.ssl-images-amazon.com/images/I/61Kpza1PWUL._SL1000_.jpg
 * 
 * Pitfall: You will need to install the RCSwitch library manually. go to:
 * Schets > Bibliotheken gebruiken > Bibliotheken beheren... > Search [rc-switch]
 * Note: The search bar is malicious, so don't search for "RCSwitch", but for "rc-switch"
 * 
 * PS: Connect the cables right. You know you're gonna at fail that during one of these excercises
 * 
 */

#include <RCSwitch.h>

RCSwitch mySwitch = RCSwitch();

void setup() {
  Serial.begin(9600);
  Serial.println("RC receiver");

  // Receiver on interrupt 0 -> that is pin #2
  // Receiver on interrupt 1 would be digital pin #3
  mySwitch.enableReceive(0);
}

void loop() {
  if(mySwitch.available()) {
    long value = mySwitch.getReceivedValue();

    if(value == 0) {
      // Oh no! The value is messed up!
      Serial.print("Unknown encoding");
    } else {
      // We're good, here's your value:      
      Serial.print("Received ");
      Serial.print(value);
      Serial.print(" / ");
      Serial.print(mySwitch.getReceivedBitlength());
      Serial.print(" bits, using protocol: ");
      Serial.print(mySwitch.getReceivedProtocol());
    }

  // And finish up
  mySwitch.resetAvailable();    
  }
}

