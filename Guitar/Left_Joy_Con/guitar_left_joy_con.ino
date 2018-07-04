/*
 * Left Joy Con of the Guitar concept: tapping bar
 * 
 * Reads input of joy stick, detects 'tapping'
 * Sends bluetooth pulse over serial bus to console upon 'tapping'
 * 
 */

/*
 * Initialising variables
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
  // Show that setup() is run, useful for debugging purposes
  Serial.begin(9600);
  pinMode(xPin, INPUT);
  pinMode(yPin, INPUT);
  pinMode(zPin, INPUT);
  // Initialises the hello-world pin, used to check if the script is running in BT-mode
  pinMode(LED_BUILTIN, OUTPUT); 
}

/*
 * Code that is executed in the loop
 */

void loop() {
  // printJoystickState();
  xPosition = analogRead(xPin);
  yPosition = analogRead(yPin);
  zPosition = digitalRead(zPin);

  tapDetection();
  delay(50);

  // For checking bluetooth
  // testPulse();
}

// Printing function for debugging purposes
void printJoystickState() {
  Serial.print("X: ");
  Serial.print(analogRead(xPin));
  Serial.print(" | Y: ");
  Serial.print(analogRead(yPin));
  Serial.print(" | Z: ");
  Serial.println(zPosition);
  delay(DELAY);
}

// Changes 'tap' based on joy stick input
void tapDetection(){
  // Note: using the names of the enumeration in the if-condition 
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

/*
 * We tried to use bluetooth, the parts of the code especially designed for testing and debugging this connection are given
 * Note that this code is *not* used in the final product
 */
 
// Blinks the built in LED every second. Used for checking 
void test_Pulse() {
  Serial.println("1");
  test_builtinLedBlink();
  delay(DELAY);
}

// Blinks the builtin LED
void test_builtinLedBlink(){
    pulseLedOn = not pulseLedOn;
    digitalWrite(LED_BUILTIN, pulseLedOn);
}
