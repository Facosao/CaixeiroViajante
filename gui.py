import tkinter

def clicked():
    lbl.configure(text="Button was clicked !!")

window = tkinter.Tk()

window.title("Welcome to LikeGeeks app")
window.geometry('260x480')

lbl = tkinter.Label(window, text="Hello")
lbl.grid(column=0, row=0)

btn = tkinter.Button(window, text="Click No", command=clicked)
btn.grid(column=1, row=0)

window.mainloop()