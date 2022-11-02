#include <iostream>

using namespace std;

int main ()
{
	int A[10] = {1,2,3,4,5,6,7,8,9,0};
	int *pAB;
	int *p;
	int i;
	
	pAB = &A[0]; // Przypisujemy adres 0 elementu tablicy
	
	for (i = 0; i < 10; i++)
	{
		p = pAB + i; // Do p przypisujemy adres tej kom�rki + warto�� i, przez to przesuwamy adres
		*p = 0; // Dostajemy si� do warto�ci tego obliczonego adresu i wstawiamy 0
	}
	
	for (i = 0; i < 10; i++)
	{
		cout << A[i] << endl;
	}
	
	return 0;
}
