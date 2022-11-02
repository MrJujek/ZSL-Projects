#include <stdio.h>

int main()
{

	/*
		"Uchwyt do pliku." - wska�nik do struktury, kt�ra symbolizuje plik.
	*/
	FILE *fIn;
	FILE *fOut;

	/*
		Zmienna na poszczeg�lny znak.
	*/
	char ch;

	/*
		fopen(Nazwa,TrybOtwarcia); - otwarcie pliku do odczytu. Przypisanie do f adresu struktury, kt�ry zwraca funkcja.
	*/
	fIn = fopen("alfa.txt", "r");
	/*
		Otwarcie pliku do zapisu. Samo w nadpisuje. a dodaje, nie nadpisuje.
	*/
	fOut = fopen("beta.txt", "a");

	/*
		Je�eli oba pliki nie s� 0, to czytaj.
	*/
	if (fIn > 0 && fOut > 0)
	{

		/*
			Do ko�ca pliku.
		*/
		putc('\n', fOut);
		while (feof(fIn) == 0)
		{
			/*
				Czytaj znak.
			*/
			ch = getc(fIn);
			/*
				Wypisuj znak do drugiego pliku.
			*/
			putc(ch, fOut);
		}

		/*
			Zamkni�cie plik�w.
		*/
		fclose(fIn);
		fclose(fOut);
	}
	else
	{
		printf("\n Blad otwarcia pliku!");
	}

	return 0;
}
