#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int czyRowne(char *t1, char *t2)
{
	while (*t1 == *t2 && t1 != NULL && t2 != NULL)
	{
		t1++;
		t2++;
	}

	if (t1 == NULL && t2 == NULL)
	{
		return (1);
	}
	else
	{
		return (0);
	}
}

int main()
{
	/*
		Tablica char (lub wskaźnik) to jest taki string w C.
	*/
	char t1[20];
	char t2[20];

	printf("Podaj pierwsze imie: ");
	gets(t1);

	printf("Podaj drugie imie: ");
	gets(t2);

	if (strcmp(t1, t2) == -1)
	{
		printf("Nie rowne");
	}
	else
	{
		printf("Rowne");
	}
}
