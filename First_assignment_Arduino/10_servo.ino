/*
 * p10-11
 * Turn servo motor
 * Manually retyped
 * 
 */

#include <Servo.h>

#define MAX_ANGLE 170
#define MIN_ANGLE 10
#define TICK 25

Servo servo = Servo();
int pos = (MAX_ANGLE + MIN_ANGLE) /2;
int step = 1;
long time = 0;

void setup() {
  servo.attach(A5);
  Serial.begin(9600);
  Serial.println("init");
}

void loop() {
  if (millis() - TICK > time) {
    time += TICK;
    if (pos > MAX_ANGLE || pos < MIN_ANGLE) {
      step = -step;
    }
    pos += step;
    servo.write(pos);
  }
}
