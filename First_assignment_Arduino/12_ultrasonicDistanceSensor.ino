/*
 * p12-13
 * Ultrasonic sensor
 * Create weird bliep-blops
 * 
 */

#define trigPin A2
#define echoPin A1

void setup() {
  Serial.begin(9600);
  // Defining names for the pins
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
}

void loop() {
  // Sending pulse
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  // Measure echo time duration
  int duration = pulseIn(echoPin, HIGH);

  // Print results
  Serial.print(duration);
  Serial.println(" ms");
  Serial.print((duration / 2) / 29);
  Serial.println(" cm");
  delay(1000);
}

