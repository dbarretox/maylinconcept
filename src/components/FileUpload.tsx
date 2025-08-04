'use client'

import { useState, useCallback } from 'react'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FileUploadProps {
    onFileSelect: (file: File | null) => void
    maxSize?: number // en MB
    acceptedTypes?: string[]
    className?: string
}

export function FileUpload({
    onFileSelect,
    maxSize = 5,
    acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'],
    className
}: FileUploadProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [preview, setPreview] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)

    const validateFile = (file: File): string | null => {
        if (file.size > maxSize * 1024 * 1024) {
            return `El archivo debe ser menor a ${maxSize}MB`
        }

        if (!acceptedTypes.includes(file.type)) {
            return 'Tipo de archivo no permitido. Use JPG, PNG o WebP'
        }

        return null
    }

    const handleFile = useCallback((file: File) => {
        setError(null)

        const validationError = validateFile(file)
        if (validationError) {
            setError(validationError)
            return
        }

        const reader = new FileReader()
        reader.onloadend = () => {
            setPreview(reader.result as string)
        }
        reader.readAsDataURL(file)

        onFileSelect(file)
    }, [maxSize, acceptedTypes, onFileSelect])

    const handleDragEnter = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(true)
    }

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)
    }

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault()
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setIsDragging(false)

        const file = e.dataTransfer.files[0]
        if (file) handleFile(file)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleFile(file)
    }

    const removeFile = () => {
        setPreview(null)
        setError(null)
        onFileSelect(null)
    }

    return (
        <div className={cn("w-full", className)}>
            {!preview ? (
                <div
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={cn(
                        "relative border-2 border-dashed rounded-lg p-8",
                        "flex flex-col items-center justify-center",
                        "transition-colors cursor-pointer",
                        isDragging ? "border-primary bg-primary/5" : "border-gray-300",
                        "hover:border-gray-400"
                    )}
                >
                    <input
                        type="file"
                        onChange={handleInputChange}
                        accept={acceptedTypes.join(',')}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />

                    <Upload className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-sm text-gray-600 text-center">
                        Arrastra tu diseño aquí o haz click para seleccionar
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                        JPG, PNG o WebP. Máximo {maxSize}MB
                    </p>
                </div>
            ) : (
                <div className="relative">
                    <div className="relative rounded-lg overflow-hidden bg-gray-100">
                        <img
                            src={preview}
                            alt="Diseño personalizado"
                            className="w-full h-48 object-contain"
                        />
                        <button
                            onClick={removeFile}
                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
            {error && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                    <span className="text-xs">⚠️</span> {error}
                </p>
            )}
        </div>
    )
}