import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import Swal from 'sweetalert2';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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

  constructor(private authService: AuthService, 
    private router: Router, 
    private fb: FormBuilder,
    public shared:SharedService) {
    this.createForm();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
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

  Login() {
    this.submitted = true;

    if (this.form.valid) {
      this.authService.signIn(this.form.value).subscribe(
        (data: any) => {
          console.log('Sign-in successful:', data);
          this.authService.LoggedInUser=data.user;
          if (data.success) {

            Swal.fire({
              icon: 'success',
              title: 'Connexion réussie !',
              text: `Bonjour ${data.user.firstName} ${data.user.lastName}`,
            }).then(() => {
            
              localStorage.setItem('token', data.token);
              localStorage.setItem('userId', data.user._id);
              this.shared.userId= localStorage.getItem('userId');
              // Redirect to the dashboard page
              this.router.navigate(['/home']);
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
