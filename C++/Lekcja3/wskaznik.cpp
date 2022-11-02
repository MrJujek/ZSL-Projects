#include <iostream>

using namespace std;

int main ()
{
	int A; // Zmienna
	int *pA; // WskaŸnik
	
	A = 10; // Wartoœæ zmiennej
	pA = &A; // Adres zmiennej do wskaŸnika
	
	*pA = 20; // Dostanie siê do wartoœci zmiennej przez wskaŸnik
	
	cout << A; // Wypisanie zmiennych
	
	return 0;
}

