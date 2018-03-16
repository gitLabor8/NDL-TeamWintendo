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

int oldX = 0;
int oldY = 0;

void setup() {
  // Show that setup() is run, even though the execercise doesn't explicitly specify this
  // No Serial.begin so we can broadcast over BT
//  Serial.begin(9600);
  //Serial.println("Program started!");

  pinMode(xPin, INPUT);
  pinMode(yPin, INPUT);
  pinMode(zPin, INPUT);
  // Init hello-world pin
  pinMode(LED_BUILTIN, OUTPUT); 
}

void printJoystickState() {
  Serial.print("X: ");
  Serial.print(xPosition);
  Serial.print(" | Y: ");
  Serial.print(yPosition);
  Serial.print(" | Z: ");
  Serial.println(zPosition);
  delay(DELAY);
}

void tapDetection(){
  // Debug functionality:
  // Serial.println(oldX - xPosition);
  if ((abs (oldX - xPosition) > 50) || (abs (oldY - yPosition)) > 50)
    Serial.println("1");
  oldX = xPosition;
  oldY = yPosition;
}

void testPulse() {
  Serial.println("1");
  builtinLedBlink();
  delay(DELAY);
}

void builtinLedBlink(){
    pulseLedOn = not pulseLedOn;
    digitalWrite(LED_BUILTIN, pulseLedOn);
}

void loop() {
  xPosition = analogRead(xPin);
  yPosition = analogRead(yPin);
  zPosition = digitalRead(zPin);

  // For checking bluetooth
  testPulse();
  // http://techwatch.keeward.com/geeks-and-nerds/how-to-configure-and-use-an-iteaduino-bt/

  //tapDetection();
  //printJoystickState();
  delay(100);
}

