https://photos.app.goo.gl/oZxzZyjWzRoy3R2n6

const int ledPin = 13;
const int photoPin = 0;

void setup()
{
  // initialize serial communication:
  Serial.begin(9600);
  // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);
}

int incomingByte;

void loop()
{
  // see if there's incoming serial data:
  if (Serial.available() > 0)
  {
    // read the oldest byte in the serial buffer:
    incomingByte = Serial.read();

    // if it's a capital H (ASCII 72), turn on the LED:
    if (incomingByte == 'H')
    {
      digitalWrite(ledPin, HIGH);
    }
    // if it's an L (ASCII 76) turn off the LED:
    if (incomingByte == 'L')
    {
      digitalWrite(ledPin, LOW);
    }

  }

  Serial.write(analogRead(photoPin));

  delay(500);
}
