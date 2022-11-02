#include <iostream>

using namespace std;

int main ()
{
	int A;
	int B;
	int *pAB;
	
	A = 10; 
	B = 20;
	pAB = &A;
	
	*pAB = *pAB + 1; 
	
	pAB = &B;
	
	*pAB = *pAB + 1;
	
	cout << A << endl << B; 
	
	return 0;
}


