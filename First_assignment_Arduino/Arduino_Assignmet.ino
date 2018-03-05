/*
 * Frank Gerlings   
 * Janneau Thijssen s4745450
 * Justin Reniers   s4743474
 * 
 * 
 * Sockets from box 14 (Eurodomest)
 * LCD shield attached
 */

#include <Servo.h>
#include <LiquidCrystal.h>
#include <RCSwitch.h>

#define MAX_ANGLE 170
#define MIN_ANGLE 10
#define TICK 25
#define BTN_DELAY 500
#define US_DELAY 1000
#define OnCode1  545007
#define OffCode1 545006
#define OnCode2  545005
#define OffCode2 545004
#define CodeLength 24
#define SendPin A4
#define KEYCOUNT 5
#define trigPin A2
#define echoPin A1

int counter_not_seen = 0;
long btn_lastTime = 0;
long us_lastTime = 0;
int keyLimits [KEYCOUNT + 1] = {50, 190, 380, 555, 790, 1024};
char keyNames [KEYCOUNT + 1] [10]
  = {"Right " , "Up " , "Down " , "Left " , "Select" , "No key"};
LiquidCrystal lcd = LiquidCrystal(8, 9, 4, 5, 6, 7);

RCSwitch mySwitch = RCSwitch();

Servo servo = Servo();
int pos = (MAX_ANGLE + MIN_ANGLE) /2;
int step = 1;
long time = 0;

bool socket1 = false;

void setup() {
  servo.attach(A5);
  Serial.begin(9600);
  Serial.println("init");
  lcd.begin(16, 2);
  mySwitch.enableTransmit(SendPin);
  mySwitch.setProtocol(1);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);
  lcd.setCursor(9, 0);
  lcd.print("Off");
  lcd.setCursor(9, 1);
  lcd.print("Off");
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

  if (millis() - BTN_DELAY > btn_lastTime){
    int val = analogRead(A0);
    lcd.setCursor(0, 0);
    lcd.print("Socket1: ");
    lcd.setCursor(0, 1);
    lcd.print("Socket2: ");
    for (int i = 0; i <= KEYCOUNT; i += 1) {
      if (val < keyLimits[i]) {
        if (strcmp(keyNames[i], "Up ") == 0){
          Serial.println("Sending Up");
          lcd.setCursor(9, 0);
          lcd.print("On ");
          lcd.setCursor(9, 1);
          lcd.print("On ");
          mySwitch.send(OnCode1, CodeLength);
          socket1 = true;
          mySwitch.send(OnCode2, CodeLength);
          break;
        }
        else if (strcmp(keyNames[i], "Down ") == 0){
          Serial.println("Sending Down");
          lcd.setCursor(9, 0);
          lcd.print("Off");
          lcd.setCursor(9, 1);
          lcd.print("Off");
          mySwitch.send(OffCode1, CodeLength);
          socket1 = false;
          mySwitch.send(OffCode2, CodeLength);
          break;
        }
        else if (strcmp(keyNames[i], "Left ") == 0){
          Serial.println("Sending Left");
          lcd.setCursor(9, 0);
          lcd.print("On ");
          lcd.setCursor(9, 1);
          lcd.print("Off");
          mySwitch.send(OnCode1, CodeLength);
          socket1 = true;
          mySwitch.send(OffCode2, CodeLength);
          break;
        }
        else if (strcmp(keyNames[i], "Right ") == 0){
          Serial.println("Sending Right");
          lcd.setCursor(9, 0);
          lcd.print("Off");
          lcd.setCursor(9, 1);
          lcd.print("On ");
          mySwitch.send(OffCode1, CodeLength);
          socket1 = false;
          mySwitch.send(OnCode2, CodeLength);
          break;
        }
        break;
      }
    }
  }

  if (millis() - US_DELAY > us_lastTime){
    counter_not_seen += 1;
    if (counter_not_seen == 60){
      mySwitch.send(OffCode1, CodeLength);
      socket1 = false;
      lcd.setCursor(9, 0);
      lcd.print("Off");
    }
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(10);
    digitalWrite(trigPin, LOW);
  
    // Measure echo time duration
    int duration = pulseIn(echoPin, HIGH);
    Serial.print(duration);
    Serial.println(" ms");
    Serial.print((duration / 2) / 29);
    Serial.println(" cm");
    delay(10);
  
    if ((duration / 2) / 29 <= 100 && socket1 == false){
      mySwitch.send(OnCode1, CodeLength);
      socket1 = true;
      lcd.setCursor(9, 0);
      lcd.print("On ");
    }
    us_lastTime += US_DELAY;
  }
}
