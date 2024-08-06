export function openDialogue() {
    console.log(document.querySelector('dialog'));
    const newTask = document.querySelector('dialog');
    newTask.showModal();
}