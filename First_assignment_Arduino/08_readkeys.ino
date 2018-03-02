/*
 * 
 * Page 8-9
 * Displays the name of the pressed button on the LCD shield
 * 
 */

#include <LiquidCrystal.h>
#define KEYCOUNT 5
int keyLimits [KEYCOUNT + 1] = {50, 190, 380, 555, 790, 1024};
char keyNames [KEYCOUNT + 1] [10]
  = {"Right " , "Up " , "Down " , "Left " , "Select" , "No key"};
LiquidCrystal lcd = LiquidCrystal(8, 9, 4, 5, 6, 7);
void setup() {
  lcd.begin(16, 2);
}
void loop() {
  int val = analogRead(A0);
  lcd.setCursor(0, 0);
  lcd.print(val);
  lcd.print(" on A0 ");
  for (int i = 0; i <= KEYCOUNT; i += 1) {
    if (val < keyLimits[i] ) {
      lcd.setCursor(0, 1);
      lcd.print(keyNames[i] );
      break;
    }
  }
  delay(500);
}
