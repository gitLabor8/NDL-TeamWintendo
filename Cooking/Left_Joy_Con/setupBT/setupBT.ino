#define DELAY 1000
boolean ledOn = false; // status of LED
long lastTime = 0;     // last status switch

void setup() {
  pinMode(13, OUTPUT);
}

void loop() {
  if(millis() - DELAY > lastTime) {
    ledOn = not ledOn;
    digitalWrite(13, ledOn);
    lastTime += DELAY;
  }
}
