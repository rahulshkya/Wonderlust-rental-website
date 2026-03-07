#include <stdio.h>


int main (){

    char arr[100]="rahul 20";
    char name[50];
    int age;

 sscanf(arr,"%s %d",name,&age);
sprintf(arr,"my name is %s and age is %d",name,age);
   

      printf("%s\n", name);  

    return 0;
}