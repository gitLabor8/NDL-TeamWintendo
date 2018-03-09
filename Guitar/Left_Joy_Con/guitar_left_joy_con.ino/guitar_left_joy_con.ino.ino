/*
 * Left Joy Con of the Guitar concept: tapping bar
 * 
 * Reads input of joy stick. Sends bluetooth pulse to console when the joy stick is 'tapped'
 * 
 */

#define DELAY 1000
boolean ledOn = false;
long lastTime = 0;

int xPin = A1;
int yPin = A2;
int buttonPin = A3;

int xPosition = 0;
int yPosition = 0;
int buttonState = 0;

int oldX = 0;
int oldY = 0;

void setup() {
  // Show that setup() is run, even though the execercise doesn't explicitly specify this
  //Serial.begin(9600);
  //Serial.println("Program started!");

  pinMode(xPin, INPUT);
  pinMode(yPin, INPUT);
  //activate pull-up resistor on the push-button pin
  pinMode(buttonPin, INPUT_PULLUP); 
  
}

void printJoystickState() {
  Serial.print("X: ");
  Serial.print(xPosition);
  Serial.print(" | Y: ");
  Serial.print(yPosition);
  Serial.print(" | Button: ");
  Serial.println(buttonState);
  delay(DELAY);
}

void tapDetection(){

  // Debug:
  // Serial.println(oldX - xPosition);
  if ((abs (oldX - xPosition) > 50) || (abs (oldY - yPosition)) > 50)
    Serial.println("1");
  oldX = xPosition;
  oldY = yPosition;
}

void testPulse() {
  Serial.println("1");
  delay(DELAY);
  
}


void loop() {
  xPosition = analogRead(xPin);
  yPosition = analogRead(yPin);
  buttonState = digitalRead(buttonPin);
  

  // For checking bluetooth
  testPulse();
  // http://techwatch.keeward.com/geeks-and-nerds/how-to-configure-and-use-an-iteaduino-bt/

  //tapDetection();
  //printJoystickState();
  delay(100);
}

