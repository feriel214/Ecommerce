import { Component } from '@angular/core';
import { AuthServiceService } from 'src/app/auth-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user = {
    email: '',
    password: ''
  };

  validationMessages = {
    email: {
      required: 'Email est requis.',
      invalidEmail: 'Format d\'adresse e-mail invalide.'
    },
    password: {
      required: 'Le mot de passe est requis.'
    }
  };

  form!: FormGroup;
  submitted = false;

  constructor(private authService: AuthServiceService, private router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, this.emailValidator]],
      password: ['', Validators.required]
    });
  }

  emailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(control.value)) {
      return { invalidEmail: true };
    }
    return null;
  }

  onSignIn() {
    this.submitted = true;

    if (this.form.valid) {
      this.authService.signIn(this.form.value).subscribe(
        (data: any) => {
          console.log('Sign-in successful:', data);

          if (data.success) {
            this.router.navigate(['/dashboard']);
            Swal.fire({
              icon: 'success',
              title: 'Connexion réussie !',
              text: `Bonjour ${data.user.firstName} ${data.user.lastName}`,
            }).then(() => {
              localStorage.setItem('token', data.token);
              // Redirect to the dashboard page
              this.router.navigate(['/dashboard/orders']);
            });
          }
        },
        (error) => {
          console.error('Sign-in error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Échec de la connexion !!',
            text: "Veuillez vérifier vos informations d'identification.",
          });
        }
      );
    }
  }
}
