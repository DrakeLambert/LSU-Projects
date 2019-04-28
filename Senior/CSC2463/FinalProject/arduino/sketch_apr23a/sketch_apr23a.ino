#include "pitches.h"

const int buttonCount = 5;
const int buttons[buttonCount] = {2, 4, 6, 8, 10};
const long buttonTimeout = 100;
const int notes[buttonCount] = {NOTE_C4, NOTE_D4, NOTE_E4, NOTE_F4, NOTE_G4};
const int buzzer = 11;
int buttonStates[buttonCount] = {LOW, LOW, LOW, LOW, LOW};
unsigned long buttonTimeouts[buttonCount] = {0, 0, 0, 0, 0};

void setup() {
  Serial.begin(9600);
  for (int i = 0; i < buttonCount; i++) {
    pinMode(buttons[i], INPUT);
  }
}

void loop() {
  for (int i = 0; i < buttonCount; i++) {
    int buttonValue = digitalRead(buttons[i]);
    if (buttonValue == HIGH && buttonValue != buttonStates[i] && millis() - buttonTimeouts[i] >= buttonTimeout) {
      Serial.write(i);
      delay(100);
      buttonStates[i] = buttonValue;
      buttonTimeouts[i] = millis();
    } else if (buttonValue != buttonStates[i]) {
      buttonStates[i] = buttonValue;
    }
  }

  if (Serial.available() > 0)
  {
    // read the oldest byte in the serial buffer:
    int incomingByte = Serial.read();

    if (incomingByte == 'W') {
      playWinTone();
    } else if (incomingByte == 'L') {
      playLossTone();
    } else {
      tone(buzzer, notes[incomingByte]);
      delay(300);
      noTone(buzzer);
    }
  }

//  Serial.write('P' + analogRead(5));
}

void playLossTone() {
  tone(buzzer, NOTE_F3);
  delay(250);
  noTone(buzzer);
  delay(100);
  tone(buzzer, NOTE_C3);
  delay(500);
  noTone(buzzer);
}

void playWinTone() {
  tone(buzzer, NOTE_C5);
  delay(250);
  noTone(buzzer);
  delay(100);
  tone(buzzer, NOTE_F5);
  delay(500);
  noTone(buzzer);
}
