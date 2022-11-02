#include <iostream>

using namespace std;

int main()
{
    int a[] = {101, 127, 1010, 789, 90};
    int max = a[0], min = a[0], suma = 0;
    int i = 0;
    
    while(i < sizeof(a) / sizeof(a[0]))
    {
        int tmp = a[i];
        if (a[i] > max)
            max = tmp;
        if (a[i] < min)
            min = tmp;
        suma += tmp;
        i++;
    }
    
    cout << "Największa wartość z tej tablicy wynosi: " << max << endl;
    cout << "Najmniejsza wartość z tej tablicy wynosi: " << min << endl;
    cout << "Suma wartości z tej tablicy wynosi: " << suma << endl;

    return 0;
}
