#include "pitches.h"

const int Xbutton = 2;
const int Ybutton = 3;
const int BUZZER = 11;

void setup() {
  Serial.begin(9600);
  pinMode(2, INPUT);
  pinMode(3, INPUT);
}

int lastAnalog = 0;
bool xHeld = false;
bool yHeld = false;

void loop() {
  int value = analogRead(0);
  if (value < lastAnalog - 1 || value > lastAnalog + 1) {
    Serial.println(value);
    lastAnalog = value;
  }
  if (digitalRead(Xbutton) == HIGH && !xHeld) {
    xHeld = true;
    Serial.println("X");
  }
  if (digitalRead(Xbutton) == LOW && xHeld) {
    xHeld = false;
  }
  if (digitalRead(Ybutton) == HIGH && !yHeld) {
    yHeld = true;
    Serial.println("Y");
  }
  if (digitalRead(Ybutton) == LOW && yHeld) {
    yHeld = false;
  }

  if (Serial.available() > 0)
  {
    int incomingByte = Serial.read();
    if (incomingByte == 'S')
    {
      playWinSequence();
    }
  }
}

void playWinSequence() {
  // play winning sequence
  tone(BUZZER, NOTE_C5);
  delay(250);
  noTone(BUZZER);
  delay(100);
  tone(BUZZER, NOTE_F5);
  delay(500);
  noTone(BUZZER);
}
