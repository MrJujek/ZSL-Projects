#include <iostream>

using namespace std;

int main()
{
	const int n = 4;
	
	int tab[n][n] = {
		{1,2,3,4},
		{5,6,7,8},
		{9,10,11,12},
		{13,14,15,16}
	};
	
	int max = tab[0][0];
	int min = tab[0][0];
	int suma = 0;
	
	for (int i = 0; i < n; i++)
	{
		for (int j = 0; j < n; j++)
		{
			if (i == j)
			{
				if (tab[i][j] > max)
					max = tab[i][j];
				if (tab[i][j] < min)
					min = tab[i][j];
				suma += tab[i][j];
			}
		}
	}
	
	cout << "Po przekatnej:" << endl;
	cout << "\tMaksimum: " << max << endl;
	cout << "\tMinimum: " << min << endl;
	cout << "\tSuma: " << suma << endl;
	
	max = tab[1][0];
	min = tab[1][0];
	suma = 0;
	
	for (int i = 0; i < n; i++)
	{
		for (int j = 0; j < n; j++)
		{
			if (i > j)
			{
				if (tab[i][j] > max)
					max = tab[i][j];
				if (tab[i][j] < min)
					min = tab[i][j];
				suma += tab[i][j];
			}
		}
	}
	
	cout << "Pod przekatna:" << endl;
	cout << "\tMaksimum: " << max << endl;
	cout << "\tMinimum: " << min << endl;
	cout << "\tSuma: " << suma << endl;
	
	max = tab[1][n-1];
	min = tab[1][n-1];
	suma = 0;
	
	int sumaIndeksow = n - 1;
	
	for (int i = 0; i < n; i++)
	{
		for (int j = 0; j < n; j++)
		{
			if (i + j > sumaIndeksow)
			{
				if (tab[i][j] > max)
					max = tab[i][j];
				if (tab[i][j] < min)
					min = tab[i][j];
				suma += tab[i][j];
			}
		}
	}
	
	cout << "Pod druga przekatna:" << endl;
	cout << "\tMaksimum: " << max << endl;
	cout << "\tMinimum: " << min << endl;
	cout << "\tSuma: " << suma << endl;
	
	return 0;
}
