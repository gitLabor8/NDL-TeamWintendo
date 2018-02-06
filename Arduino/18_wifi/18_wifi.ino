/*
 * p18-20
 * Wifi 
 * Single button web page
 * 
 * Watch out with the voltages:
 *  - a wifi card would need 3.3 volt
 *  - the Vcc has bigger range with 5 volt
 * 
 * Downgrade your Arduino IDE to 1.6.5 to ensure things work:
 * https://www.arduino.cc/en/Main/OldSoftwareReleases
 * 
 */

#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>

// Ok, I just had to define this one
#define WaitASec delay(1000)

// MDNS = Multicast DNS, resolves host names to IP addresses
MDNSResponder mdns;
// Our networkname. Pop up a wifi network with your phone. And please, use a punny name
const char* ssid = "Free CeX";
// Same for the password
const char* password = "(.)(.) Yes I'm a grown-up";

#define LISTENPORT 80
ESP8266Webserver server = ESP8266WebServer(LISTEN_PORT);
String webPage = "";
bool ledOn = false;

void setup() {
  // the serial speed of the Nodemcu
  Serial.begin(115200);
  // The LED of the Nodemcu
  pinMode(DO, OUTPUT);
  // The actual status is inverted
  digitalWrite(DO, ledOn);

  // Let's build the web page somewhere else, to keep things tidy and seperated
  buildWebPage;

  // make the WiFi connection
  WiFi.begin(ssid, password);
  Serial.println("Start connecting");
  while(WiFi.status() != WL_CONNECTED) {
    // While not connected, retry every second
    WaitASec;
    Serial.print(".");  
  }
  // We are connected! Let's print our connection data
  printConnectionData;

  // Start the DNS-resolver
  if(mdns.begin("esp8266", WiFi.localIP())) {
    Serial.println("MDNS responder started");
  }

  // Make handlers for input from WiFi connection
  refreshServer;
  onButtonPress;

  // Start the server for WiFi input
  server.begin();
  Serial.println("HTTP server started\n you did one heck of a job boys");
}

void loop() {
  server.handleClient();
}

// Awesomefy this some more pls
//  and pls send me a screenshot of the result
void buildWebPage() {
  webPage += "<h1>WiFi LED control</h1>";
  webPage += "<p><b>Press me 8===&gt;<a href=\"button\">";
  webPage += "<button style=\"background-color:#000000;color:#E62272;\">LED</button>";
  webPage += "</a></b></p>";
}

void printConnectionData() {
  Serial.println("");
  Serial.println("\"The Eagle has Landed\" - N. Armstrong, 1969");
  Serial.print("Connected to ");
  Serial.print("ssid");
  Serial.print(". IP address: ");
  Serial.println(WiFi.localIP());
}

/*
 * Eventhandlers
 */

void refreshServer() {
  server.on("/", [](){
    server.send(200, "text/html", webPage);
  });
}

void onButtonPress() {
  // Button pressed
  Server.on("/button", [](){
    server.send(200, "text/html", webPage);
    ledOn = !ledOn;
    Serial.print("led ");
    Serial.println(ledOn);
    digitalWrite(DO, ledOn);
    WaitASec;
  });
}

