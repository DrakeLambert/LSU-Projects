#include "pitches.h"

#define BUZZER 11

int buttonCount = 3;
int buttons[3] = {1, 2, 3};
int notes[3] = {NOTE_C4, NOTE_D4, NOTE_E4};

int winSequence[3];
int userSequence[3];

int userNoteCount = 0;

void setup() {
  // set pin modes
  for (int i = 0; i < buttonCount; i++) {
    pinMode(buttons[i], INPUT);
  }
  srand(analogRead(0));
  setWinSequence();
  playWinSequence();
}

void setWinSequence() {
  // set winning sequence
  for (int i = 0; i < buttonCount; i++) {
    winSequence[i] = rand() % 3;
  }
}

void playWinSequence() {
  // play winning sequence
  for (int i = 0; i < 3; i++) {
    tone(BUZZER, notes[winSequence[i]]);
    delay(500);
    noTone(BUZZER);
    delay(250);
  }
}

void playLossTone() {
  tone(BUZZER, NOTE_F3);
  delay(250);
  noTone(BUZZER);
  delay(100);
  tone(BUZZER, NOTE_C3);
  delay(500);
  noTone(BUZZER);
}

void playWinTone() {
  tone(BUZZER, NOTE_C5);
  delay(250);
  noTone(BUZZER);
  delay(100);
  tone(BUZZER, NOTE_F5);
  delay(500);
  noTone(BUZZER);
}

void loop() {
  for (int i = 0; i < buttonCount; i++) {
    int buttonValue = digitalRead(buttons[i]);
    if (buttonValue == HIGH) {
      // play note
      tone(BUZZER, notes[i]);
      delay(500);
      noTone(BUZZER);

      // remember note
      userSequence[userNoteCount] = i;
      userNoteCount++;
    }
  }

  // check for endgame
  if (userNoteCount == buttonCount) {

    // check notes match
    bool userNotesMatch = true;
    for (int i = 0; i < buttonCount; i++) {
      if (winSequence[i] != userSequence[i]) {
        userNotesMatch = false;
        break;
      }
    }

    // play win or loss tone
    delay(1000);
    if (userNotesMatch) {
      playWinTone();
    } else {
      playLossTone();
    }
    delay(1000);


    // reset game
    userNoteCount = 0;
    setWinSequence();
    playWinSequence();
  }
}
