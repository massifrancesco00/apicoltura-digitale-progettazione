#include <Wire.h>
#include "Adafruit_HTU21DF.h"

//dichiaro una variabile che rappresenta il sensore dell'umidità
Adafruit_HTU21DF sht21 = Adafruit_HTU21DF();

//definisco i pin dove attaccherò l'imput e output del sensore
#define I2C_SDA 15
#define I2C_SCL 14

//dichiaro varibili globali per le soglie (umidità), il contatore l'intervallo di tempo da attendere e il tempo passato
float TEST_Umidita_Max;
float TEST_Umidita_Min;
float umidita;

int contatore = 0;
unsigned long tempoPrecedente = 0;
const long intervallo = 2000; 

//il setup dell'esp32-CAM, dove colleghiamo i fili e controlliamo la presenza del sensore dell'umidità
//poi tariamo per la prima volta le soglie
void setup() {
  Serial.begin(115200);
  Wire.begin(I2C_SDA, I2C_SCL);
  
  if (!sht21.begin()) {
    Serial.println("Errore: Sensore SHT21 non trovato!");
    while (1);
  }

  taraSoglie(); 
  Serial.println("--- Sistema Avviato ---");
}

//inizio del programma vero e proprio
void loop() {
  unsigned long tempoAttuale = millis();
  //controllo del timer per definire quando facciamo una misurazione dell'umidità 
    if (tempoAttuale - tempoPrecedente >= intervallo) {
    tempoPrecedente = tempoAttuale;
    //controllo: se il contatore è minore di 5 esegue il programma (ovvero il controllo dell'umidità) Altrimenti esce e ricomincia la taratura.
    if (contatore < 5) {  
      Serial.print("Iterazione ciclo: "); 
      Serial.println(contatore + 1);
      
      contatore++;
      umidita = sht21.readHumidity();

      //controlla il valore di umidità ottenuto e manipola il dato per capire se siamo a rischio o no.
      //se l'umidità è nulla o troppo alta manderà un errore
      if (umidita == 998 || isnan(umidita)) {
        Serial.println("[ALERT DB] Errore hardware sensore! Salvataggio log su memoria interna.");
      } 
      else {
        //se l'umidità dentro l'arnia è troppo alta manderà un alert al client in percentuale di umidità nell'aria
        if (umidita > TEST_Umidita_Max) {
          Serial.print("[ALERT DB] Umidità troppo ALTA: ");
          Serial.print(umidita);
          Serial.println("%");
        } 
        //se l'umidità dentro l'arnia è troppo bassa manderà un alert al client in percentuale di umidità nell'aria
        else if (umidita < TEST_Umidita_Min) {
          Serial.print("[ALERT DB] Umidità troppo BASSA: ");
          Serial.print(umidita);
          Serial.println("%");
        } 

        /*per motivi di TEST abbiamo deciso di mandare un alert ancge quando l'umidità è ottimale, sulla versione finale sarà rimosso
          e invierà i dati al database, la stessa cosa succede agli altri, i dati sono inviati al database, insieme all'allert di errore
          (bisogna ancora implementare il JSON come richiederà il team del database)
        */
        else {
          Serial.print("Umidità ottimale: ");
          Serial.print(umidita);
          Serial.println("%");
        }
      }
      
      Serial.println("Attesa per il prossimo campione...");
      Serial.println("---------------------------------------");
    } 

    /*quando si arriva a 5 allora ripete la taratura */
    else {
      Serial.println("Ciclo di 5 completato. Ricaricamento soglie...");
      contatore = 0;
      taraSoglie();
    }
  }
}

void taraSoglie() {
  TEST_Umidita_Max = 70.0;
  TEST_Umidita_Min = 30.0;
  Serial.println("Soglie aggiornate: Min 30% - Max 70%");
  }
