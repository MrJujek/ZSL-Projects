#include <iostream>
using namespace std;

struct Osoba {
		int age;
		char name[20];
		char surname[20];
		int weight;
		int height;
		
		//struct rodzina R;
	};
	
int main () {	

    int liczba = 2;
	struct Osoba O[liczba];
	
//	O.age=18;
//	O.name = "adam";
//	O.surname = "Kowal";
//	O.weight = 85;
//	
//	cin >> O.height; 

	cout << "PODAWANIE DANYCH\n";
	for (int i = 0; i < liczba; i++) {
		printf("\nWiek: ");scanf("%d", &O[i].age);
		printf("\nImie: ");scanf("%s", &O[i].name);
		printf("\nNazwisko: ");scanf("%s", &O[i].surname);
		printf("\nWaga: ");scanf("%d", &O[i].weight);
		printf("\nWysokosc: ");scanf("%d", &O[i].height);
	}
	
	int min = O[0].age;
	for (int i = 0; i < liczba; i++) {
		if (min > O[i].age) {
			min = O[i].age;
		}
	}
	
	cout << "\n\nPOKAZYWANIE DANYCH\n";
	for (int i = 0; i < liczba; i++) {
		if (O[i].age == min) {
			printf("\nWiek: %d", O[i].age);
			printf("\nImie: %s", &O[i].name);
			printf("\nNazwisko: %s", &O[i].surname);
			printf("\nWaga: %d", O[i].weight);
			printf("\nWysokosc: %d", O[i].height);
		}
		
	}
		
	
	
	
	
	
//	cout << endl << O.age << endl <<
//	O.name  <<endl <<
//	O.surname<<endl <<
//	O.weight<<endl<<
//	O.height;
	
	return 0;
}