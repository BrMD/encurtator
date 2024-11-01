# encurtator

The idea of encurtator is to be an shortner Url, encrypting and decrypting data using SHA-256 to encrypt user password and RSA to encrypt and decrypt the original url provided by the user.

the main goals of this application is:

~~-learn how to work with Cryptography on the backend~~

~~-learn how to use SHA-256 to cryptograph the user password~~

~~-learn how to use RSA with public and private keys to cryptograph the original link provided by the user~~

~~-make the redirect work on backend and frontend~~

~~-login working with sessionId stored in user's browser~~

~~-register the user provinding email and password~~

~~improve the layout and make a better User Experience~~

~~standardize the messages coming from the backend~~

To run the application you have to create a postgresql database and create a db.properties on the same level of the application.properties, I created in render.com and add jdbc:postgresql:// before the real url on the spring.datasource.url
![image](https://github.com/user-attachments/assets/28af308a-748a-4a90-8c03-60de7e9d4c6f)



https://github.com/user-attachments/assets/55dede7b-4f3f-4956-a7a0-bd48c22f8e46

To run the application first git clone this appication after that open 2 terminal cd encurtator, in one of the terminal run cd angular and npm run start, in the other terminal cd java-spring and mvn spring-boot:run
