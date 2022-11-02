#include <stdio.h>
#include <stdlib.h>

int main()
{
	int *A;
	int i;
	int N;

	printf("Podaj wielkosc tablicy: ");
	scanf("%d", &N);
	A = malloc(N * sizeof(*A));
	printf("\n");

	//	for (i = 0; i < N; i++)
	//	{
	//		A[i] = 2 * i;
	//
	//		printf("%d \n", A[i]);
	//	}

	for (i = 0; i < N; i++)
	{
		printf("Podaj wartosc dla %d: ", i);
		scanf("%d", A + i);
	}

	printf("Liczby: \n");
	for (i = 0; i < N; i++)
	{
		printf("%d \n", A[i]);
	}

	free(A);
}
