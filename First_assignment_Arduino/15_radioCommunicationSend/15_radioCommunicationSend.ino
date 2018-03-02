/*
 * Hello World!
 * 
 */

#define DELAY 1000
// Ok, I just had to define this one
#define WaitASec delay(DELAY)
boolean ledOn = false;
long lastTime = 0;

int xPin = A1;
int yPin = A2;
int buttonPin = A3;

int xPosition = 0;
int yPosition = 0;
int buttonState = 0;

void setup() {
  // Show that setup() is run, even though the execercise doesn't explicitly specify this
  Serial.begin(9600);
  Serial.println("Program started!");

  pinMode(xPin, INPUT);
  pinMode(yPin, INPUT);
  //activate pull-up resistor on the push-button pin
  pinMode(buttonPin, INPUT_PULLUP); 
  
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  if(millis() - DELAY > lastTime) {
    ledOn = not ledOn;
    digitalWrite(LED_BUILTIN, ledOn);
    lastTime += DELAY;
  xPosition = analogRead(xPin);
  yPosition = analogRead(yPin);
  buttonState = digitalRead(buttonPin);
  
  Serial.print("X: ");
  Serial.print(xPosition);
  Serial.print(" | Y: ");
  Serial.print(yPosition);
  Serial.print(" | Button: ");
  Serial.println(buttonState);

  delay(100); // add some delay between reads

  }
}

