 async function checkuncheck(id,status){
           const todoid = id.replace("chk","")
           if(status == '0'){
                $("#"+id).addClass('completed');                
                try {
                 const payload = {
                    id : todoid,
                    status : 1
                }
                const response = await fetch(`${window.location.origin}/updatetodos`,{
                    method : 'POST',
                    headers : {
                        'content-type' : 'application/json'
                    },
                    body : JSON.stringify(payload)
                });
            const result = await response.json();
             Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Success!',
                text: 'Todo Updated !',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                background: '#f0f9f0',
                iconColor: '#28a745',
                customClass: {
                    popup: 'success-toast'
                },
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });
            loadtodos();
            allcounts();
           } catch (error) {
                    Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error!',
                    text: error,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: '#fdf2f2',
                    iconColor: '#dc3545',
                    customClass: {
                        popup: 'error-toast'
                    },
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                });
           }
           }
           else
           {                
                try {
                 const payload = {
                    id : todoid,
                    status : 0
                }
                const response = await fetch(`${window.location.origin}/updatetodos`,{
                    method : 'POST',
                    headers : {
                        'content-type' : 'application/json'
                    },
                    body : JSON.stringify(payload)
                });
            const result = await response.json();
             Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Success!',
                text: 'Todo Updated !',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                background: '#f0f9f0',
                iconColor: '#28a745',
                customClass: {
                    popup: 'success-toast'
                },
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });
            $("#"+id).removeClass('completed');
            loadtodos();            
            allcounts();
           } catch (error) {
                    Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error!',
                    text: error,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: '#fdf2f2',
                    iconColor: '#dc3545',
                    customClass: {
                        popup: 'error-toast'
                    },
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                });
           }

           }
        }
      async function loadtodos(){
           const response = await fetch(`${window.location.origin}/all-todo`);
           const data = await response.json();
           const todosdata = data.Data;
           let htmlcode = ``;
           todosdata.forEach(element => {
                console.log(element.id);  
                htmlcode += `
                <div class="todo-item">
                    <div class="todo-checkbox ${element.status == '1' ? 'completed' : ''}" 
                        onclick="checkuncheck('chk${element.id}','${element.status}')" 
                        id="chk${element.id}">
                    </div>
                    <div class="todo-text ${element.status == '1' ? 'completed' : ''}"" id="chk${element.id}">${element.title}</div>
                    <button class="delete-btn" onclick="Deletetodo(${element.id})">×</button>
                </div>
                `;          
           });
           console.log(htmlcode);
           
           document.getElementById("todolist").innerHTML = htmlcode;
        } 
        
        async function allcounts(){
            
           const response = await fetch(`${window.location.origin}/all-todo-counts`);
           const data = await response.json();
           const Totaltask = data.Data[0].Totaltask;
           const Completedtask = data.Data[0].Completedtask;
           let htmltext = `${Totaltask} tasks ${Completedtask} Completed`;
           // 6 tasks, 2 completed
           $("#countspan").text(htmltext);

        } 
        
        async function Deletetodo(todoid) {
            try {
                 const payload = {
                    id : todoid
                }
                const response = await fetch(`${window.location.origin}/deletetodos`,{
                    method : 'POST',
                    headers : {
                        'content-type' : 'application/json'
                    },
                    body : JSON.stringify(payload)
                });
            const result = await response.json();
             Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Success!',
                text: 'Todo Deleted !',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                background: '#f0f9f0',
                iconColor: '#28a745',
                customClass: {
                    popup: 'success-toast'
                },
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });
            loadtodos();            
            allcounts();
           } catch (error) {
                    Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error!',
                    text: error,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: '#fdf2f2',
                    iconColor: '#dc3545',
                    customClass: {
                        popup: 'error-toast'
                    },
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                });
           }

        }

        async function savetodoapp(){
            const todotile = document.getElementById("todotitle").value; 
            if(!todotile || todotile==null)
            {
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: "todo title",
                    text: "todod title required !",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: '#fdf2f2',
                    iconColor: '#dc3545'
                });
                return;
            }  
           try {
                 const payload = {
                    title : $("#todotitle").val()
                }
                const response = await fetch(`${window.location.origin}/addtodos`,{
                    method : 'POST',
                    headers : {
                        'content-type' : 'application/json'
                    },
                    body : JSON.stringify(payload)
                });
            const result = await response.json();
             Swal.fire({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Success!',
                text: 'Todo Created !',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                background: '#f0f9f0',
                iconColor: '#28a745',
                customClass: {
                    popup: 'success-toast'
                },
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            });
            loadtodos();
            allcounts();
            $("#todotitle").val("")
           } catch (error) {
                    Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error!',
                    text: error,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    background: '#fdf2f2',
                    iconColor: '#dc3545',
                    customClass: {
                        popup: 'error-toast'
                    },
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                });
           }

        }
        // Simple checkbox toggle for design demonstration
        document.querySelectorAll('.todo-checkbox').forEach(checkbox => {
            checkbox.addEventListener('click', function() {
                const todoItem = this.closest('.todo-item');
                const todoText = todoItem.querySelector('.todo-text');
                
                this.classList.toggle('completed');
                todoText.classList.toggle('completed');
                
                // Update stats after toggle
                updateStats();
            });
        });

        // Filter functionality
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.textContent.toLowerCase();
                const todoItems = document.querySelectorAll('.todo-item');
                
                todoItems.forEach(item => {
                    const isCompleted = item.querySelector('.todo-checkbox').classList.contains('completed');
                    
                    if (filter === 'all') {
                        item.style.display = 'flex';
                    } else if (filter === 'active' && !isCompleted) {
                        item.style.display = 'flex';
                    } else if (filter === 'completed' && isCompleted) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Update stats
        function updateStats() {
            const totalTasks = document.querySelectorAll('.todo-item').length;
            const completedTasks = document.querySelectorAll('.todo-checkbox.completed').length;
            const activeTasks = totalTasks - completedTasks;
            
            const statsText = document.querySelector('.stats-text');
            statsText.textContent = `${totalTasks} tasks, ${completedTasks} completed`;
        }

        // Clear completed functionality
        document.querySelector('.clear-btn').addEventListener('click', function() {
            const completedItems = document.querySelectorAll('.todo-item .todo-checkbox.completed');
            completedItems.forEach(checkbox => {
                checkbox.closest('.todo-item').remove();
            });
            updateStats();
        });

        // Initialize stats
        updateStats();