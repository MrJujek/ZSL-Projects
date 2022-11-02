#include <iostream>

using namespace std;

int main()
{
    int a[] = {101, 127, 1010, 789, 90};
    int max = a[0];
    
    for (int i = 0; i < sizeof(a) / sizeof(a[0]); i++)
    {
        if (a[i] > max)
            max = a[i];
    }
    
    cout << "Największa wartość z tej tablicy wynosi: " << max;

    return 0;
}
