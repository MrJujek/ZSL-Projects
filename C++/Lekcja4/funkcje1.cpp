#include <iostream>

using namespace std;

int suma_tab (int *tab, int n);

int main ()
{
	const int N = 10;
	int tab[N] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
	
	cout << "Suma elementow tablicy: " << suma_tab(tab, N) << endl;
	
	return 0;
}

int suma_tab (int *tab, int n)
{
	int suma = 0;
	for (int i = 0; i < n; i++)
		/* 
			Zamiast tab[i], bo zwiêkszamy adres tablicy o wielkoœæ jednego int 
			i tak idziemy po tablicy. 
			* ten adres zamienia na dan¹ wartoœæ w index.
		*/
		suma += *(tab + i);
	return suma;
}
