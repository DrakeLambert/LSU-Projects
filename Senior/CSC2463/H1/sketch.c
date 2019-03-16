int timeUnit = 200;

void setup()
{
    pinMode(LED_BUILTIN, OUTPUT);
}

void loop()
{
    dot();
    dot();
    dot();
    dash();
    dash();
    dash();
    dot();
    dot();
    dot();
    delay(timeUnit * 5);
}

void dot()
{
    digitalWrite(LED_BUILTIN, HIGH);
    delay(timeUnit);
    digitalWrite(LED_BUILTIN, LOW);
    delay(timeUnit);
}

void dash()
{
    digitalWrite(LED_BUILTIN, HIGH);
    delay(timeUnit * 3);
    digitalWrite(LED_BUILTIN, LOW);
    delay(timeUnit);
}
