#include <WiFi.h>
#include <WiFiMulti.h>

WiFiMulti wifiMulti;

void setup() {
  Serial.begin(115200);
  delay(2000);
  
  Serial.println("\n=== TEST WiFiMulti ===\n");
  
  // Aggiungi l'hotspot del tuo telefono
  // Sostituisci con i tuoi dati reali
    wifiMulti.addAP("Gruppo4Network", "Networks");
  
  // Puoi aggiungere anche il tuo router di casa come backup
  
  Serial.println("Tentativo connessione...");
  
  if (wifiMulti.run() == WL_CONNECTED) {
    Serial.println("\n✓ WiFi CONNESSO!");
    Serial.print("SSID: ");
    Serial.println(WiFi.SSID());
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());
    Serial.print("RSSI: ");
    Serial.print(WiFi.RSSI());
    Serial.println(" dBm");
  } else {
    Serial.println("\n✗ Connessione FALLITA");
  }
}

void loop() {
  // Controlla ogni 10 secondi
  static unsigned long ultimoCheck = 0;
  
  if (millis() - ultimoCheck >= 10000) {
    ultimoCheck = millis();
    
    if (wifiMulti.run() != WL_CONNECTED) {
      Serial.println("! WiFi disconnesso, riconnessione...");
    } else {
      Serial.print("✓ Connesso a: ");
      Serial.print(WiFi.SSID());
      Serial.print(" | RSSI: ");
      Serial.print(WiFi.RSSI());
      Serial.println(" dBm");
    }
  }
  
  delay(100);
}
