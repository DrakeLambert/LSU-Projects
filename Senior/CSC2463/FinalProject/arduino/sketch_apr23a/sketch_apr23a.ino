const int buttonCount = 5;
const int buttons[buttonCount] = {2, 4, 6, 8, 10};
int buttonStates[buttonCount] = {LOW, LOW, LOW, LOW, LOW};

void setup() {
  Serial.begin(9600);
  for (int i = 0; i < buttonCount; i++) {
    pinMode(buttons[i], INPUT);
  }
}

void loop() {
  for (int i = 0; i < buttonCount; i++) {
    int buttonValue = digitalRead(buttons[i]);
    if (buttonValue == HIGH && buttonValue != buttonStates[i]) {
      Serial.write(i);
      delay(100);
      buttonStates[i] = buttonValue;
    } else if (buttonValue != buttonStates[i]) {
      buttonStates[i] = buttonValue;
    }
  }
}
