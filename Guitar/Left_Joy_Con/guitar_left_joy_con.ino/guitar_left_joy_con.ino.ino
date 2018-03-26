/*
 * Left Joy Con of the Guitar concept: tapping bar
 * 
 * Reads input of joy stick. Sends bluetooth pulse to console when the joy stick is 'tapped'
 * 
 */

#define DELAY 1000

// Builtin LED
boolean pulseLedOn = false;
long lastTime = 0;

// State of tap detection
enum state {neutral, triggered};
state tap = neutral;

// Joystick up and down
int xPin = A1;
int yPin = A2;
// Joystick press
int zPin = A3;

// Joystick init positions
int xPosition = 0;
int yPosition = 0;
// zPosition = Button press
int zPosition = 0;

void setup() {
  // Show that setup() is run, even though the execercise doesn't explicitly specify this
  Serial.begin(9600);
  pinMode(xPin, INPUT);
  pinMode(yPin, INPUT);
  pinMode(zPin, INPUT);
  // Init hello-world pin
  pinMode(LED_BUILTIN, OUTPUT); 
}

void printJoystickState() {
  Serial.print("X: ");
  Serial.print(analogRead(xPin));
  Serial.print(" | Y: ");
  Serial.print(analogRead(yPin));
  Serial.print(" | Z: ");
  Serial.println(zPosition);
  delay(DELAY);
}

void tapDetection(){
  // Tap has been triggered and returned to initial positions afterwards
  if (tap == 1 &&
       (xPosition >= 490 && xPosition <= 510) &&
       (yPosition >= 535 && yPosition <= 545)){
       tap = 0;
       }

  // Tap was in neutral position before and is now triggered
  else if (tap == 0 && 
      ((xPosition <= 450 || xPosition >= 550) ||
      (yPosition <= 490 || yPosition >= 590))){
      Serial.println("1");
      tap = 1;
      }
}

void test_Pulse() {
  Serial.println("1");
  test_builtinLedBlink();
  delay(DELAY);
}

void test_builtinLedBlink(){
    pulseLedOn = not pulseLedOn;
    digitalWrite(LED_BUILTIN, pulseLedOn);
}

void loop() {
  // printJoystickState();
  xPosition = analogRead(xPin);
  yPosition = analogRead(yPin);
  zPosition = digitalRead(zPin);

  // For checking bluetooth
  // testPulse();
  // http://techwatch.keeward.com/geeks-and-nerds/how-to-configure-and-use-an-iteaduino-bt/

  tapDetection();
  delay(50);
}

