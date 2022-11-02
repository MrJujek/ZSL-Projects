#include <stdio.h>

int main () {
	
	/* 
		"Uchwyt do pliku." - wskaŸnik do struktury, która symbolizuje plik.
	*/
	FILE *f;
	
	/* 
		Zmienna na poszczególny znak.
	*/
	char ch;
	
	/*
		fopen(Nazwa,TrybOtwarcia); - otwarcie pliku do odczytu. Przypisanie do f adresu struktury, który zwraca funkcja.
	*/
	f = fopen("alfa.txt", "r");
	
	/* 
		Je¿eli plik nie jest 0, to czytaj.
	*/
	if (f > 0) {
		
		/* 
			Do koñca pliku.
		*/
		while (feof(f) == 0) {
			/* 
				Czytaj znak.
			*/
			ch = getc(f);
			/* 
				Wypisuj znak.
			*/
			putchar(ch);
		}
		
		/* 
			Zamkniêcie pliku.
		*/
		fclose(f);
			
	} else {
		printf("\n Blad otwarcia pliku!");
	}
	
	return 0;
}
